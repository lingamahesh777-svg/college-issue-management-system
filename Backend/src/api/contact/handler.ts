import { createMessage, getAllMessages } from "../../operations/contact.operation";
import { Request, ResponseToolkit } from "@hapi/hapi";

export const sendMessageHandler = async (req: Request, h: ResponseToolkit) => {
  try {
    const message = await createMessage(req.payload);

    return h.response({
      success: true,
      message: "Message sent successfully",
      data: message,
    }).code(201);

  } catch (err) {
    return h.response({
      success: false,
      message: "Failed to send message",
    }).code(500);
  }
};

export const getMessagesHandler = async (req: Request, h: ResponseToolkit) => {
  try {
    const messages = await getAllMessages();

    return h.response({
      success: true,
      data: messages,
    });

  } catch (err) {
    return h.response({
      success: false,
      message: "Failed to fetch messages",
    }).code(500);
  }
};
