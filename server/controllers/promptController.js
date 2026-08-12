const Prompt = require("../models/Prompt.js")

//Create Prompt
const createPrompt = async (req, res) => {
    try {
        const prompt = await Prompt.create(req.body);
        res.status(201).json({
            sucess: true,
            data: prompt
        })
    } catch (e) {
        res.status(500).json({
            sucess: false,
            message: e.message
        })
    }
}

//Get All Prompts
const getPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.find().sort({ createdAt: -1 });
        res.status(200).json({
            sucess: true,
            data: prompts
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }

}

//Get One Prompt
const getSinglePrompt = async (req, res) => {
    try {
        const prompt = await Prompt.findById(req.params.id);

        if (!prompt) {
            res.status(404).json({
                sucess: false,
                message: "Prompt not found"
            })
        }
        res.status(200).json({
            sucess: true,
            data: prompt
        })

    } catch (err) {
        res.status(500).json({
            sucess: false,
            message: err.message
        })
    }
}

//Update a Prompt
const updatePrompt = async (req, res) => {
    try {
        const newPrompt = await Prompt.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!newPrompt) {
            res.status(404).json({
                sucess: false,
                message: "Prompt Not Found"
            })
        }
        res.status(200).json({
            sucess: true,
            data: newPrompt
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}

//Delete a prompt 
const deletePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndDelete(req.params.id);

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Prompt deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Reorder prompts
const reorderPrompts = async (req, res) => {
  try {
    const { prompts } = req.body;

    if (!Array.isArray(prompts)) {
      return res.status(400).json({
        message: "Prompts must be an array",
      });
    }

    const operations = prompts.map((prompt) => ({
      updateOne: {
        filter: { _id: prompt.id },
        update: {
          $set: { order: prompt.order },
        },
      },
    }));

    await Prompt.bulkWrite(operations);

    res.status(200).json({
      message: "Prompt order updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update prompt order",
    });
  }
};
// Bulk Create Prompts
const bulkCreatePrompts = async (req, res) => {
  try {
    const { prompts } = req.body;
    if (!Array.isArray(prompts)) {
      return res.status(400).json({ message: "Prompts must be an array" });
    }

    const createdPrompts = await Prompt.insertMany(prompts);
    res.status(201).json({
      success: true,
      data: createdPrompts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createPrompt, getPrompts, getSinglePrompt, updatePrompt, deletePrompt, reorderPrompts, bulkCreatePrompts }