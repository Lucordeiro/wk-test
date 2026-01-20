import { Server, Socket } from "socket.io";
import Message from "../models/Message";
import User from "../models/User";

interface ChatData {
  from: string;
  to: string;
  content: string;
}

export default (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected", socket.id);

    // Guarda o ID do usuário logado neste socket
    socket.on("user-online", async (userId: string) => {
      socket.data.userId = userId;

      await User.findByIdAndUpdate(userId, { status: true });
      const users = await User.find(
        { },
        "name username online"
      );
      io.emit("update-users", users);
    });

    socket.on("send-message", async (data: ChatData) => {
      const message = await Message.create(data);
      io.emit("new-message", message);
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected");

      // Se este socket estava associado a um user → marcar offline

      if (socket.data.userId) {
        await User.findByIdAndUpdate(socket.data.userId, { status: false });
        const users = await User.find(
          { },
          "name username online"
        );
        io.emit("update-users", users);
      }
    });
  });
};

