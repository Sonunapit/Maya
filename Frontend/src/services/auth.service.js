import { api } from "./api.js";

export const loginRequest = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);

export const registerRequest = ({ email, firstName, lastName, password }) =>
  api.post("/auth/register", { email, fullName: { firstName, lastName }, password }).then((r) => r.data);
