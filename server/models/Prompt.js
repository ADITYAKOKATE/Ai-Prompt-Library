const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    prompt: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Coding",
        "SQL",
        "Marketing",
        "Content Writing",
        "Email",
        "Resume",
        "Design",
        "Social Media",
        "Productivity",
        "Others",
      ],
    },

    tags: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Prompt = mongoose.model("Prompt", promptSchema);

module.exports = Prompt;