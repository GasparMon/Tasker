"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors")); // Importa el paquete CORS
require("./database/mongoBD");
const app = (0, express_1.default)();
// Analizar el cuerpo de las solicitudes con formato JSON
app.use(express_1.default.json());
// Analizar cuerpos de solicitudes con datos codificados en URL y con formato JSON
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
// Analizar cookies de las solicitudes entrantes
app.use((0, cookie_parser_1.default)());
// Middleware de registro de solicitudes (morgan)
app.use((0, morgan_1.default)("dev"));
// Middleware de CORS
app.use((0, cors_1.default)()); // Esto habilitará CORS para todas las rutas
// Configuración de CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// Rutas
app.use("/", routes_1.default);
// Middleware de manejo de errores
app.use((err, req, res, next) => {
    let status;
    if (err instanceof Error) {
        status = 500; // Valor por defecto
    }
    else {
        status = err.status || 500;
    }
    const message = err.message || "Internal Server Error";
    console.error(err);
    res.status(status).send(message);
});
exports.default = app;
