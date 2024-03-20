import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors"; // Importa el paquete CORS
import "./database/mongoBD";
import { Server, Socket } from "socket.io";
import http from "http";
import path from "path";

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Rutas
app.use("/", routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (room) => {
    socket.join(room); // El cliente se une a la sala especificada
    console.log(`User ${socket.id} has joined room ${room}`);
  });

  socket.on("message", (data) => {
    // Envío de mensaje solo a los clientes en la misma sala
    io.to(data.room).emit("message", data);
  });

  socket.on("alert", (data) => {
    // Emitir la alerta a todos los usuarios conectados
    io.emit("alert", data);
  });

  socket.on("alertTwo", (data) => {
    // Emitir la alerta a todos los usuarios conectados
    io.emit("alertTwo", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// Middleware de manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let status: number;
  if (err instanceof Error) {
    status = 500; // Valor por defecto
  } else {
    status = (err as any).status || 500;
  }
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(status).send(message);
});

export default server;

