import { api } from "./api.js";

// backend seedha array bheje ya { chats: [...] } / { data: [...] }, dono chalega
const pickList = (d, ...keys) => {
  if (Array.isArray(d)) return d;
  for (const k of [...keys, "data", "items", "results"]) if (Array.isArray(d?.[k])) return d[k];
  console.warn("Unexpected list response shape:", d);
  return [];
};

export const getChats = () => api.get("/chat").then((r) => pickList(r.data, "chats"));

export const createChat = (title) =>
  api.post("/chat", { title }).then((r) => r.data.chat || r.data.data || r.data);

export const getMessages = (id) =>
  api.get(`/chat/${id}/messages`).then((r) => pickList(r.data, "messages"));

export const deleteChat = (id) => api.delete(`/chat/${id}`);