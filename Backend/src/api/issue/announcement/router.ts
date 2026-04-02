import { Server } from "@hapi/hapi";
import { createAnnouncement, getAnnouncements, addComment } from "./handler";
import { createAnnouncementValidation, addCommentValidation } from "../../../shared/validation/announcement.validation";

export const announcementRoutes = (server: Server) => {
  server.route([
    {
      method: "GET",
      path: "/api/announcement",
      handler: getAnnouncements,
    },
    {
      method: "POST",
      path: "/api/announcement",
      handler: createAnnouncement,
      options: {
        payload: {
          output: "stream",
          parse: true,
          multipart: true,
          maxBytes: 5 * 1024 * 1024,
        },
        validate: {
          payload: createAnnouncementValidation,
        },
      },
    },
    {
      method: "POST",
      path: "/api/announcement/comment/{id}",
      handler: addComment,
      options: {
        validate: {
          payload: addCommentValidation,
        },
      },
    },
  ]);
};
