import { Issue } from "../models/issue.model.js";

export const createIssue = async (req, res) => {
    const { title, description, category } = req.body;
    if (!req.file) {
    return res.status(400).json({
        message: "Image is required"
    });
}
    const issue = await Issue.create({
        title,
        description,
        category,
        image: req.file?.cloudinaryUrl,
        reporter: req.user._id
    })
    return res.status(201).json({
        message: "Issue created successfully",
        issue
    })
}

export const getIssues = async (req, res) => {
    let query = {};

    if (req.user.role === "student") {
        query = { reporter: req.user._id };
    } else if (req.user.role === "staff") {
        query = { assignee: req.user._id };
    }

    const issues = await Issue.find(query)
        .populate("reporter", "username");

    return res.status(200).json({
        message: "Issues fetched successfully",
        issues
    });
};

export const getOneIssue = async (req, res) => {
    try {
        const { issueId } = req.params;

        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        if (
            req.user.role === "student" &&
            issue.reporter.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "You are not authorized to view this issue"
            });
        }

        if (
            req.user.role === "staff" &&
            issue.assignee?.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "You are not authorized to view this issue"
            });
        }

        return res.status(200).json({
            message: "Issue fetched successfully",
            issue
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const assignIssue = async (req, res) => {
    try {
        const { issueId } = req.params;
        const { staffId } = req.body;

        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        const staff = await User.findById(staffId);

        if (!staff) {
            return res.status(404).json({
                message: "Staff member not found"
            });
        }

        if (staff.role !== "staff") {
            return res.status(400).json({
                message: "Selected user is not a staff member"
            });
        }

        issue.assignee = staff._id;
        issue.status = "assigned";

        await issue.save();

        return res.status(200).json({
            message: "Issue assigned successfully",
            issue
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const updateIssueStatus = async (req, res) => {
    try {
        const { issueId } = req.params;
        const { status } = req.body;

        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        if (
            req.user.role === "staff" &&
            issue.assignee?.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "You are not assigned to this issue"
            });
        }

        const validTransitions = {
            open: ["assigned"],
            assigned: ["in_progress"],
            in_progress: ["resolved"],
            resolved: []
        };

        if (!validTransitions[issue.status].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        issue.status = status;

        await issue.save();

        return res.status(200).json({
            message: "Issue status updated successfully",
            issue
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const deleteIssue = async (req, res) => {
    try {
        const { issueId } = req.params;

        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        if (
            req.user.role === "student" &&
            issue.reporter.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "You are not authorized to delete this issue"
            });
        }

        await Issue.findByIdAndDelete(issueId);

        return res.status(200).json({
            message: "Issue deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};