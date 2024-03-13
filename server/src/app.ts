import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors"; // Importa el paquete CORS
import "./database/mongoBD";

const app = express();

// Analizar el cuerpo de las solicitudes con formato JSON
app.use(express.json());



// Analizar cuerpos de solicitudes con datos codificados en URL y con formato JSON
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

// Analizar cookies de las solicitudes entrantes
app.use(cookieParser());

// Middleware de registro de solicitudes (morgan)
app.use(morgan("dev"));

// Middleware de CORS
app.use(cors()); // Esto habilitará CORS para todas las rutas

// Configuración de CORS
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

export default app;
