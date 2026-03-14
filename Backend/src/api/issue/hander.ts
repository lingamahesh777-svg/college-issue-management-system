import fs from "fs";
import path from "path";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { createIssueDB, getAllIssuesDB, getIssueByIdDB, getIssuesDB } from "../../operations/issue.operation";
import { validateCreateIssue } from "../../shared/validation/issue.validation";
import Issue from "../../models/Issue";
import { request } from "http";


export const createIssueHandler = async (req: Request, h: ResponseToolkit) => {
  try {
    const payload: any = req.payload;

    console.log("PAYLOAD:", payload);

    // validation
    const { isValid, message } = validateCreateIssue(payload);
    if (!isValid) {
      return h.response({ message }).code(400);
    }

    let imageName = "";

    if (payload.image && payload.image.hapi) {
      const image = payload.image;
      const ext = image.hapi.filename.split(".").pop();
      imageName = `${Date.now()}.${ext}`;

      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      const uploadPath = path.join(uploadDir, imageName);

      await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(uploadPath);
        image.pipe(fileStream);
        fileStream.on("finish", resolve);
        fileStream.on("error", reject);
      });
    }

    const issue = await createIssueDB({
      name: payload.name,
      rollNo: payload.rollNo,
      phoneNo: payload.phoneNo,
      issuePlace: payload.issuePlace,
      issue: payload.issue,
      address: payload.address,
      description: payload.description,
      image: imageName,
    });

    return h.response({
      message: "Issue created successfully",
      issue,
    }).code(201);

  } catch (err) {
    console.error(err);
    return h.response({ message: "Server error", err }).code(500);
  }
};






export const updateIssueStatusHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = req.params as any;
    const { status, solverName, solverPhone } = req.payload as any;

    const issue = await Issue.findById(id);

    if (!issue) {
      return h.response({ message: "Issue not found" }).code(404);
    }

    // ✅ Update Status
    if (status) {
      issue.status = status;

      issue.statusHistory.push({
        status,
        changedAt: new Date(),
      });

      if (status === "RESOLVED") {
        issue.resolvedAt = new Date();
      }
    }

    // ✅ Update Solver Info
    if (solverName) {
      issue.solverName = solverName;
    }

    if (solverPhone) {
      issue.solverPhone = solverPhone;
    }

    await issue.save();

    return h.response({
      message: "Issue updated successfully",
      issue,
    }).code(200);

  } catch (err) {
    return h.response({ message: "Error updating issue", err }).code(500);
  }
};

export const getIssueByIdHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = req.params as any;

    const issue = await getIssueByIdDB(id);

    if (!issue) {
      return h.response({ message: "Issue not found" }).code(404);
    }

    return h.response({
      message: "Issue fetched successfully",
      issue,
    }).code(200);

  } catch (err) {
    return h.response({ message: "Error", err }).code(500);
  }
};

export const getIssuesHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { status } = req.query as any;

    const issues = await getIssuesDB(status);

    return h.response({
      message: "Issues fetched successfully",
      count: issues.length,
      issues,
    }).code(200);

  } catch (err) {
    return h.response({ message: "Error", err }).code(500);
  }
};

import { deleteIssue } from "../../operations/issue.operation";

export const deleteIssueHandler = async (req: any, h: any) => {
  try {
    const { id } = req.params;

    const deleted = await deleteIssue(id);

    if (!deleted) {
      return h.response({
        success: false,
        message: "Issue not found",
      }).code(404);
    }

    return h.response({
      success: true,
      message: "Issue deleted successfully",
    }).code(200);

  } catch (err) {
    return h.response({
      success: false,
      message: "Failed to delete issue",
    }).code(500);
  }
};
