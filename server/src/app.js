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
const connectedUsers = {};
function getUsersInRoom(room) {
    const users = [];
    const roomSockets = io.sockets.adapter.rooms;
    // if (roomSockets) {
    //   roomSockets.forEach((socketId) => {
    //     users.push(socketId);
    //   });
    // }
    // return users;
    return roomSockets;
}
io.on("connection", (socket) => {
    console.log("Client connected");
    console.log(socket.id);
    socket.on("join_room", (data) => {
        console.log("prueba---", socket.join(data.id));
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
