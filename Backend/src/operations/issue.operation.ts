import Issue from "../models/Issue";


export const createIssueDB = async (data: any) => {
  const issue = new Issue(data);
  return await issue.save();
};

export const getAllIssuesDB = async () => {
  return await Issue.find().sort({ createdAt: -1 });
};

export const getIssueByIdDB = async (id: string) => {
  return Issue.findById(id);
};

export const getIssuesDB = async (status?: string) => {
  if (status) {
    return Issue.find({ status });
  }
  return Issue.find(); // ✅ return ALL issues
};

export const deleteIssue = async (id: string) => {
  return await Issue.findByIdAndDelete(id);
};
