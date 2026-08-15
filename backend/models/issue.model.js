import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true , "Title is required"],
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: [true , "Description is required"],
        trim: true,
        maxlength: 500,
    },
    category: {
        type: String,
        enum: ["wifi", "electricity", "water", "other"],
        default: "other",
    },
    image: {
        url: {
            type: String
        },
        publicId: {
            type: String
        }
},
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    status: {
        type: String,
        enum: ["open", "assigned","in_progress","resolved"],
        default: "open",
    },
}, {
    timestamps: true
})

export const Issue = mongoose.model("Issue", issueSchema);