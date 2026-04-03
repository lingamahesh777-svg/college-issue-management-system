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
   port: Number(process.env.PORT) || 5000,
    host: process.env.HOST || "0.0.0.0",
    routes: {
      cors: {
        origin: ["http://localhost:5173"],
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
 issueRoutes(server);        // function that takes server ✅
announcementRoutes(server); // if function ✅
authRoutes(server);         // if function ✅
contactRoutes(server);      // if function ✅
    await server.start();
    console.log("Server running on", server.info.uri);
  };

  startServer();
