const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// In-memory chat storage (last 100 messages)
let chatMessages = [];
const MAX_MESSAGES = 100;

// Online users tracking
let onlineUsers = new Map();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["polling", "websocket"],
    pingTimeout: 60000,
    pingInterval: 25000,
    upgradeTimeout: 30000,
    allowUpgrades: true,
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle user joining
    socket.on("join", (username) => {
      onlineUsers.set(socket.id, {
        username,
        joinedAt: new Date().toISOString(),
      });

      // Send existing messages to new user
      socket.emit("chat-history", chatMessages);

      // Notify all users about the new user
      io.emit("user-joined", {
        username,
        onlineCount: onlineUsers.size,
        users: Array.from(onlineUsers.values()).map((u) => u.username),
      });

      // System message
      const systemMessage = {
        id: Date.now().toString(),
        type: "system",
        content: `${username} joined the chat`,
        timestamp: new Date().toISOString(),
      };
      chatMessages.push(systemMessage);
      if (chatMessages.length > MAX_MESSAGES) {
        chatMessages = chatMessages.slice(-MAX_MESSAGES);
      }
      io.emit("new-message", systemMessage);
    });

    // Handle new messages
    socket.on("send-message", (data) => {
      console.log("Received send-message event from:", socket.id, "data:", data);
      const user = onlineUsers.get(socket.id);
      if (!user) {
        console.log("User not found in onlineUsers for socket:", socket.id);
        socket.emit("error", { message: "You must join the chat first" });
        return;
      }

      // Validate message (100 words limit)
      const words = data.content.trim().split(/\s+/);
      if (words.length > 100) {
        socket.emit("error", { message: "Message exceeds 100 words limit" });
        return;
      }

      const message = {
        id: Date.now().toString() + socket.id,
        type: "user",
        username: user.username,
        content: data.content.trim(),
        timestamp: new Date().toISOString(),
      };

      console.log("Broadcasting message:", message);
      chatMessages.push(message);
      if (chatMessages.length > MAX_MESSAGES) {
        chatMessages = chatMessages.slice(-MAX_MESSAGES);
      }

      io.emit("new-message", message);
    });

    // Handle typing indicator
    socket.on("typing", (isTyping) => {
      const user = onlineUsers.get(socket.id);
      if (user) {
        socket.broadcast.emit("user-typing", {
          username: user.username,
          isTyping,
        });
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      const user = onlineUsers.get(socket.id);
      if (user) {
        onlineUsers.delete(socket.id);

        // System message
        const systemMessage = {
          id: Date.now().toString(),
          type: "system",
          content: `${user.username} left the chat`,
          timestamp: new Date().toISOString(),
        };
        chatMessages.push(systemMessage);
        if (chatMessages.length > MAX_MESSAGES) {
          chatMessages = chatMessages.slice(-MAX_MESSAGES);
        }
        io.emit("new-message", systemMessage);

        io.emit("user-left", {
          username: user.username,
          onlineCount: onlineUsers.size,
          users: Array.from(onlineUsers.values()).map((u) => u.username),
        });
      }
      console.log("User disconnected:", socket.id);
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
