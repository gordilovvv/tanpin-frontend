import { api } from "@/app/api";

export const pingPong = () => api.get("/auth.ping");
