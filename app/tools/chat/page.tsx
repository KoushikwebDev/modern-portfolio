"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io, Socket } from "socket.io-client";
import {
  Send,
  Users,
  MessageCircle,
  Sparkles,
  ArrowLeft,
  User,
  Clock,
  Hash,
  Smile,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useDesignRotator } from "@/components/DesignRotator";

interface Message {
  id: string;
  type: "user" | "system";
  username?: string;
  content: string;
  timestamp: string;
}

interface TypingUser {
  username: string;
  isTyping: boolean;
}

// Random username generator
const adjectives = ["Swift", "Bright", "Cool", "Epic", "Mega", "Super", "Ultra", "Cosmic", "Mystic", "Neon"];
const nouns = ["Phoenix", "Dragon", "Wolf", "Eagle", "Tiger", "Falcon", "Panther", "Hawk", "Lion", "Bear"];
const generateUsername = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 100);
  return `${adj}${noun}${num}`;
};

// Color generator based on username
const getUserColor = (username: string) => {
  const colors = [
    "from-violet-500 to-purple-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-green-500",
    "from-orange-500 to-amber-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-blue-500",
    "from-teal-500 to-cyan-500",
    "from-fuchsia-500 to-pink-500",
  ];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function ChatPage() {
  const { currentTheme } = useDesignRotator();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasJoinedRef = useRef(false);

  // Generate random username on mount
  useEffect(() => {
    setInputUsername(generateUsername());
  }, []);

  // Connect to socket and set up event listeners
  const connectSocket = useCallback((usernameToJoin: string) => {
    // Prevent double connection
    if (socketRef.current?.connected) {
      console.log("Socket already connected, emitting join");
      socketRef.current.emit("join", usernameToJoin);
      return;
    }

    // Disconnect existing socket if any
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    console.log("Creating new socket connection...");
    
    const socketInstance = io(window.location.origin, {
      transports: ["polling", "websocket"], // Start with polling, then upgrade to websocket
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      forceNew: true,
      upgrade: true,
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to socket server:", socketInstance.id);
      setIsConnected(true);
      // Emit join immediately after connection
      if (usernameToJoin && !hasJoinedRef.current) {
        console.log("Emitting join for:", usernameToJoin);
        socketInstance.emit("join", usernameToJoin);
        hasJoinedRef.current = true;
      }
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
      setIsConnected(false);
      hasJoinedRef.current = false;
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
      setError("Connection failed. Please try again.");
      setTimeout(() => setError(""), 3000);
    });

    socketInstance.on("chat-history", (history: Message[]) => {
      console.log("Received chat history:", history.length, "messages");
      setMessages(history);
    });

    socketInstance.on("new-message", (message: Message) => {
      console.log("New message received:", message);
      setMessages((prev) => [...prev, message]);
    });

    socketInstance.on("user-joined", (data: { username: string; onlineCount: number; users: string[] }) => {
      console.log("User joined:", data);
      setOnlineCount(data.onlineCount);
      setOnlineUsers(data.users);
    });

    socketInstance.on("user-left", (data: { username: string; onlineCount: number; users: string[] }) => {
      console.log("User left:", data);
      setOnlineCount(data.onlineCount);
      setOnlineUsers(data.users);
    });

    socketInstance.on("user-typing", (data: TypingUser) => {
      if (data.isTyping) {
        setTypingUsers((prev) => Array.from(new Set([...prev, data.username])));
      } else {
        setTypingUsers((prev) => prev.filter((u) => u !== data.username));
      }
    });

    socketInstance.on("error", (data: { message: string }) => {
      setError(data.message);
      setTimeout(() => setError(""), 3000);
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        console.log("Cleaning up socket connection");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Auto-scroll to bottom (scroll container only, not the page)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Character count
  useEffect(() => {
    setCharCount(newMessage.length);
  }, [newMessage]);

  const handleJoin = () => {
    if (!inputUsername.trim()) return;
    const finalUsername = inputUsername.trim().slice(0, 20);
    setUsername(finalUsername);
    setIsJoined(true);
    // Connect to socket and join with username
    connectSocket(finalUsername);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || charCount > 100 || !socket?.connected) {
      if (!socket?.connected) {
        setError("Not connected. Please refresh the page.");
        setTimeout(() => setError(""), 3000);
      }
      return;
    }

    console.log("Sending message:", newMessage);
    socket.emit("send-message", { content: newMessage });
    setNewMessage("");
    socket.emit("typing", false);
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (socket?.connected) {
      socket.emit("typing", true);

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("typing", false);
      }, 2000);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Join Screen
  if (!isJoined) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 py-20 transition-all duration-700 ${currentTheme.pageBg}`}>
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${currentTheme.heroGlow}`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${currentTheme.heroGlow}`} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md"
        >
          {/* Back Button */}
          <Link href="/tools" className="absolute -top-12 left-0">
            <Button variant="ghost" size="sm" className={`gap-2 transition-all duration-700 ${currentTheme.textSecondary} hover:${currentTheme.textPrimary}`}>
              <ArrowLeft className="w-4 h-4" />
              Back to Tools
            </Button>
          </Link>

          <div className={`p-8 rounded-3xl transition-all duration-700 ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow}`}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`inline-flex p-4 rounded-2xl mb-4 ${currentTheme.heroButton}`}>
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className={`text-3xl font-bold mb-2 transition-all duration-700 ${currentTheme.textPrimary}`}>Join Chat Room</h1>
              <p className={`transition-all duration-700 ${currentTheme.textSecondary}`}>Connect with others in real-time</p>
            </div>

            {/* Username Input */}
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 transition-all duration-700 ${currentTheme.textPrimary}`}>Your Username</label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-700 ${currentTheme.textSecondary}`} />
                  <input
                    type="text"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                    maxLength={20}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-700 ${currentTheme.inputBg} ${currentTheme.inputBorder} ${currentTheme.inputFocus} outline-none`}
                    placeholder="Enter username..."
                  />
                </div>
                <p className={`text-xs mt-2 transition-all duration-700 ${currentTheme.textSecondary}`}>Random username generated. Feel free to change it!</p>
              </div>

              <Button
                onClick={handleJoin}
                disabled={!inputUsername.trim()}
                className={`w-full h-12 rounded-xl transition-all duration-700 ${currentTheme.btnPrimary}`}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Join Chat Room
              </Button>
            </div>

            {/* Features */}
            <div className={`mt-8 pt-6 border-t transition-all duration-700 ${currentTheme.borderStyle}`}>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className={`p-3 rounded-xl transition-all duration-700 ${currentTheme.tagBg}`}>
                  <Users className={`w-5 h-5 mx-auto mb-1 transition-all duration-700 ${currentTheme.accentColor}`} />
                  <p className={`text-xs transition-all duration-700 ${currentTheme.textSecondary}`}>Real-time Chat</p>
                </div>
                <div className={`p-3 rounded-xl transition-all duration-700 ${currentTheme.tagBg}`}>
                  <Hash className={`w-5 h-5 mx-auto mb-1 transition-all duration-700 ${currentTheme.accentColor}`} />
                  <p className={`text-xs transition-all duration-700 ${currentTheme.textSecondary}`}>No Registration</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Chat Room
  return (
    <div className={`min-h-screen flex flex-col py-20 px-4 transition-all duration-700 ${currentTheme.pageBg}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${currentTheme.heroGlow}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${currentTheme.heroGlow}`} />
      </div>

      <div className="relative max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center justify-between mb-4 p-4 rounded-2xl transition-all duration-700 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
        >
          <div className="flex items-center gap-4">
            <Link href="/tools">
              <Button variant="ghost" size="icon" className={`rounded-xl transition-all duration-700 ${currentTheme.textSecondary} hover:${currentTheme.textPrimary}`}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className={`text-xl font-bold flex items-center gap-2 transition-all duration-700 ${currentTheme.textPrimary}`}>
                <MessageCircle className={`w-5 h-5 ${currentTheme.accentColor}`} />
                Chat Room
              </h1>
              <p className={`text-sm transition-all duration-700 ${currentTheme.textSecondary}`}>
                Logged in as <span className={`font-medium ${currentTheme.accentColor}`}>{username}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-700 ${currentTheme.tagBg} ${currentTheme.tagBorder}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${currentTheme.heroDot}`} />
              <span className={`text-sm font-medium transition-all duration-700 ${currentTheme.tagText}`}>{onlineCount} online</span>
            </div>
          </div>
        </motion.div>

        {/* Error Toast */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Container */}
        <motion.div
          ref={messagesContainerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex-1 overflow-y-auto rounded-2xl p-4 mb-4 transition-all duration-700 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Smile className={`w-12 h-12 mx-auto mb-3 opacity-50 transition-all duration-700 ${currentTheme.textSecondary}`} />
                <p className={`transition-all duration-700 ${currentTheme.textSecondary}`}>No messages yet. Start the conversation!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    message.type === "system"
                      ? "text-center"
                      : message.username === username
                      ? "flex justify-end"
                      : "flex justify-start"
                  )}
                >
                  {message.type === "system" ? (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs transition-all duration-700 ${currentTheme.tagBg} ${currentTheme.tagText}`}>
                      {message.content}
                    </span>
                  ) : (
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl p-3",
                        message.username === username
                          ? `${currentTheme.heroButton} text-white rounded-br-md`
                          : `${currentTheme.cardBg} ${currentTheme.cardBorder} rounded-bl-md`
                      )}
                    >
                      {message.username !== username && (
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full bg-gradient-to-r flex items-center justify-center text-[10px] font-bold text-white",
                              getUserColor(message.username || "")
                            )}
                          >
                            {message.username?.charAt(0).toUpperCase()}
                          </div>
                          <span className={`text-xs font-medium ${currentTheme.accentColor}`}>{message.username}</span>
                        </div>
                      )}
                      <p className={cn("text-sm break-words", message.username === username ? "text-white" : currentTheme.textPrimary)}>
                        {message.content}
                      </p>
                      <div className="flex justify-end mt-1">
                        <span className={cn("text-[10px]", message.username === username ? "text-white/60" : currentTheme.textSecondary)}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </motion.div>

        {/* Typing Indicator */}
        <AnimatePresence>
          {typingUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-2 px-4"
            >
              <span className={`text-xs transition-all duration-700 ${currentTheme.textSecondary}`}>
                {typingUsers.length === 1
                  ? `${typingUsers[0]} is typing...`
                  : `${typingUsers.slice(0, 2).join(", ")} are typing...`}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSendMessage}
          className={`p-4 rounded-2xl transition-all duration-700 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => handleTyping(e.target.value)}
                placeholder="Type your message..."
                className={`w-full px-4 py-3 pr-20 rounded-xl outline-none transition-all duration-700 ${currentTheme.inputBg} ${currentTheme.inputBorder} ${currentTheme.inputFocus}`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className={cn("text-xs", charCount > 100 ? "text-red-400" : currentTheme.textSecondary)}>
                  {charCount}/100
                </span>
              </div>
            </div>
            <Button
              type="submit"
              disabled={!newMessage.trim() || charCount > 100}
              className={`h-12 w-12 rounded-xl transition-all duration-700 ${currentTheme.btnPrimary} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
