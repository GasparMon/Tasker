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
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// Rutas
app.use("/", routes_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
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
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});
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
exports.default = server;
