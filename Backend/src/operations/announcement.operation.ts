import { Announcement } from "../models/Announcement";

export const createAnnouncementOperation = async (
  message: string,
  image: string
) => {
  return await Announcement.create({ message, image });
};

export const getAllAnnouncementsOperation = async () => {
  return await Announcement.find().sort({ createdAt: -1 });
};

export const addCommentOperation = async (
  id: string,
  user: string,
  comment: string
) => {
  const post = await Announcement.findById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  post.comments.push({ user, comment });
  await post.save();

  return post;
};
