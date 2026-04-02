  import Hapi from "@hapi/hapi";
  import Inert from "@hapi/inert";
  import dotenv from "dotenv";
  import path from "path";
  import { connectDB } from "./plugins/db";
  import { issueRoutes } from "./api/issue/router";
  import { announcementRoutes } from "./api/issue/announcement/router";
  import { authRoutes } from "./api/auth/router";
import { contactRoutes } from "./api/contact/router";

  dotenv.config();

  const startServer = async () => {
    // ✅ connect DB
    await connectDB();

   const server = Hapi.server({
  port: process.env.PORT || 5000,
  host: "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      credentials: true,
      headers: ["Accept", "Content-Type", "Authorization"],
      additionalHeaders: ["X-Requested-With"],
    },
    files: {
      relativeTo: path.join(process.cwd(), "uploads"),
    },
  },
});


    // ✅ register inert (IMPORTANT)
    await server.register(Inert);

    // ✅ route to serve images
    server.route({
      method: "GET",
      path: "/uploads/{param*}",
      handler: {
        directory: {
          path: ".",
          listing: false,
        },
      },
    });

    // ✅ API routes
    issueRoutes(server);
  server.route(announcementRoutes);
  authRoutes(server);
server.route(contactRoutes);

    await server.start();
    console.log("Server running on", server.info.uri);
  };

  startServer();
