const express = require("express");
const router = express.Router();

const {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.post("/", createExpense);
router.get("/", getExpenses);

module.exports = router;