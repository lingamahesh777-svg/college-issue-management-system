import Message from "../models/Message";

export const createMessage = async (payload: any) => {
  return await Message.create(payload);
};

export const getAllMessages = async () => {
  return await Message.find().sort({ createdAt: -1 });
};
