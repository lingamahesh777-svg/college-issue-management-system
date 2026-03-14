import { ServerRoute } from "@hapi/hapi";
import { sendMessageHandler, getMessagesHandler } from "./handler";
import { createMessageValidation } from "../../shared/validation/contact.validation";

export const contactRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/contact",
    handler: sendMessageHandler,
    options: {
      validate: createMessageValidation,
    },
  },
  {
    method: "GET",
    path: "/api/contact",
    handler: getMessagesHandler,
  },
];
