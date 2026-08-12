const express = require("express");
const {createPrompt, getPrompts, getSinglePrompt, updatePrompt,deletePrompt, reorderPrompts, bulkCreatePrompts} = require("../controllers/promptController.js")


const router = express.Router()

router.post('/', createPrompt)
router.post('/bulk', bulkCreatePrompts)
router.get('/', getPrompts)
router.patch('/reorder', reorderPrompts)
router.get('/:id', getSinglePrompt)
router.put('/:id',updatePrompt)
router.delete('/:id',deletePrompt)
module.exports = router