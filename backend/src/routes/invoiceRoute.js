import express from "express"
import { addInvoice, getInvoices, updateInvoice, deleteInvoice } from "../controllers/invoiceController.js"

const router = express.Router()

router.post("/invoice", addInvoice)
router.get("/invoices", getInvoices)
router.put("/updateInvoice", updateInvoice)
router.delete("/deleteInvoice/:id", deleteInvoice)

export default router;
