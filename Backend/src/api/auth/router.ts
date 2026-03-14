import { Server } from "@hapi/hapi";
import {
  registerHandler,
  loginHandler,
} from "./handler";

export const authRoutes = (server: Server) => {
  server.route([
    {
      method: "POST",
      path: "/api/auth/register",
      options: {
        auth: false, // public route
      },
      handler: registerHandler,
    },
    {
      method: "POST",
      path: "/api/auth/login",
      options: {
        auth: false, // public route
      },
      handler: loginHandler,
    },
  ]);
};
