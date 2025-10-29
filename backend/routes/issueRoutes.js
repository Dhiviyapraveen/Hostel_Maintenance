import express from "express";
import Issue from "../models/Issue.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/* 🟢 1. Dashboard stats route — must come before /:id                        */
/* -------------------------------------------------------------------------- */
router.get("/status", async (req, res) => {
  try {
    console.log("📡 Fetching issue status counts...");

    const pending = await Issue.countDocuments({ status: "Pending" });
    const resolved = await Issue.countDocuments({ status: "Resolved" });

    console.log("✅ Pending:", pending, "Resolved:", resolved);
    res.json({ pending, resolved });
  } catch (error) {
    console.error("❌ Error fetching status:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
      stack: error.stack,
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟢 2. Get all issues or filter by category using query                     */
/* -------------------------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    const issues = await Issue.find(filter);
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟢 3. Get issues by category using path param                              */
/* -------------------------------------------------------------------------- */
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const issues = await Issue.find({ category });

    if (!issues.length) {
      return res
        .status(404)
        .json({ message: `No issues found for category: ${category}` });
    }

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟢 4. Get single issue by ID                                               */
/* -------------------------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟢 5. Create a new issue (Student submission)                              */
/* -------------------------------------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    const { name, roomNo, category, description, status } = req.body;

    if (!name || !roomNo || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIssue = new Issue({
      name,
      roomNo,
      category,
      description,
      status: status || "Pending",
    });

    await newIssue.save();
    res
      .status(201)
      .json({ message: "Issue created successfully", issue: newIssue });
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟢 6. Update issue (Admin changes status)                                  */
/* -------------------------------------------------------------------------- */
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟢 7. Delete issue                                                         */
/* -------------------------------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
    if (!deletedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
