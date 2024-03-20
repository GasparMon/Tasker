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

const connectedUsers: { [key: string]: User } = {};

interface User {
  id: string;
  userId: string;
  email: string;
}

function getUsersInRoom(room: string) {
  const users: any = [];
  const roomSockets = io.sockets.adapter.rooms
  // if (roomSockets) {
  //   roomSockets.forEach((socketId) => {
  //     users.push(socketId);
  //   });
  // }
  // return users;
  return roomSockets
}

io.on("connection", (socket: Socket) => {
  console.log("Client connected");
  console.log(socket.id);

  socket.on("join_room", (data) => {
    console.log("prueba---", socket.join(data.id))
    socket.join(data);
    console.log(`User ${socket.id} has joined room ${data}`);

    console.log("data ---1", data);

    connectedUsers[socket.id] = data;

    console.log("data ---2", connectedUsers[socket.id]);

    console.log("data ---3", getUsersInRoom(data.id));

    io.to(data.id).emit("users_info");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
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

// let connectedUsers: { [key: string]: User } = {};

// interface User {
//   id: string;
//   userId: string;
//   email: string;
// }

// function getUsersInRoom(room: string) {
//   const users: any = [];
//   const roomSockets = io.sockets.adapter.rooms.get(room);
//   if (roomSockets) {
//     roomSockets.forEach((socketId) => {
//       if (connectedUsers[socketId]) {
//         users.push({
//           id: socketId,
//           userId: connectedUsers[socketId].userId,
//           email: connectedUsers[socketId].email,
//         });
//       }
//     });
//   }
//   return users;
// }

// app.use(express.static(path.join(__dirname, "public")));

// io.on("connection", (socket: Socket) => {
//   console.log("Cliente Conectado");
//   console.log(socket.id);

//   socket.on("join_room", (data: { room: string; userId: string; email: string }) => {
//     socket.join(data.room);
//     console.log(`User ${socket.id} has joined room ${data.room}`);

//     connectedUsers[socket.id] = {
//       id: socket.id,
//       userId: data.userId,
//       email: data.email
//     };

//     io.to(data.room).emit("users_info", getUsersInRoom(data.room));
//   });

//   socket.on("send_message", (data) => {
//     console.log(data);
//     socket.to(data.room).emit("recieve_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });
