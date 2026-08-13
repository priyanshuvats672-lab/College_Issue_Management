import { mongo, Schema } from "mongoose";

const issueSchema = new Schema({
    title: {
        type: String,
        required: [true , "Title is required"],
        trim: true,
        maxlength: 100,
        minlength: 10,
    },
    description: {
        type: String,
        required: [true , "Description is required"],
        trim: true,
        maxlength: 500,
        minlength: 50,
    },
    category: {
        type: String,
        enum: ["wifi", "electricity", "water", "other"],
        default: "other",
    },
    image: {
        type: String,
        publicId: String
    },
    reporter: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assignee: {
        type: Schema.Types.ObjectId,
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