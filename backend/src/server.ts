import * as http from "http";
import { Server } from "socket.io";
import app from "./app";
import chatSockets from "./sockets/chat";

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

chatSockets(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
