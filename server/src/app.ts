import express from "express";
import routes from "./routes/routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "./database/mongoBD";

const app = express();

// Analizar el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Rutas
app.use("/", routes);

// Analizar cuerpos de solicitudes con datos codificados en URL y con formato JSON
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

// Analizar cookies de las solicitudes entrantes
app.use(cookieParser());

// Middleware de registro de solicitudes (morgan)
app.use(morgan("dev"));

// Configuración de CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

export default app;
