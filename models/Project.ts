import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    category: {
      type: String,
      required: [true, "Project category is required"],
      trim: true,
    },
    year: {
      type: Schema.Types.Mixed, // allows string (e.g. "2024") or number (e.g. 2024)
      required: [true, "Project year is required"],
    },
    tags: {
      type: [String],
      required: [true, "Project tech stack tags are required"],
      default: [],
    },
    imageUrl: {
      type: String,
      required: [true, "Project image URL is required"],
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    challenge: {
      type: String,
    },
    solution: {
      type: String,
    },
    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export type IProject = mongoose.InferSchemaType<typeof projectSchema>;
