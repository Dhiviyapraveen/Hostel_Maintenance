import Issue from "../models/Issue.js";

export const createIssue = async (req, res) => {
  try {
    const { title, description, roomNo } = req.body;
    const issue = new Issue({ title, description, roomNo });
    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Error creating issue", error });
  }
};

export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Error fetching issues", error });
  }
};

export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const issue = await Issue.findByIdAndUpdate(id, { status }, { new: true });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Error updating issue", error });
  }
};
