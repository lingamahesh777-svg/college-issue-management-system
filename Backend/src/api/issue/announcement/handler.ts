import { Request, ResponseToolkit } from "@hapi/hapi";

import path from "path";
import fs from "fs";
import { addCommentOperation, createAnnouncementOperation, getAllAnnouncementsOperation } from "../../../operations/announcement.operation";

export const createAnnouncement = async (
  request: Request,
  h: ResponseToolkit
) => {
  const { message } = request.payload as any;
  const file = (request.payload as any).image;

  let filename = "";

  if (file) {
    filename = `${Date.now()}-${file.hapi.filename}`;
    const filePath = path.join(process.cwd(), "uploads", filename);

    const fileStream = fs.createWriteStream(filePath);
    await new Promise((resolve, reject) => {
      file.pipe(fileStream);
      file.on("end", resolve);
      file.on("error", reject);
    });
  }

  const post = await createAnnouncementOperation(message, filename);

  return h.response(post).code(201);
};

export const getAnnouncements = async () => {
  return await getAllAnnouncementsOperation();
};

export const addComment = async (
  request: Request,
  h: ResponseToolkit
) => {
  const { id } = request.params;
  const { user, comment } = request.payload as any;

  const updated = await addCommentOperation(id, user, comment);

  return h.response(updated).code(200);
};
