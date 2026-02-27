"use client";
import { useState } from "react";

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I can answer questions about skin cancer. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Skin Cancer AI Chatbot</h2>
      <div style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: "8px 0" }}>
            <span style={{ background: msg.role === "user" ? "#007bff" : "#e0e0e0", color: msg.role === "user" ? "white" : "black", padding: "8px 12px", borderRadius: "16px", display: "inline-block" }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about skin cancer..."
        />
        <button onClick={sendMessage} style={{ padding: "8px 16px", borderRadius: "8px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
          Send
        </button>
      </div>
    </div>
  );
}