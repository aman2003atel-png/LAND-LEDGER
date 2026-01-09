import { Router } from "express";
import { downloadController, scanReceiptController } from "../controllers/transaction.controller";
import { upload } from "../config/cloudinary.config";

const transactionRoutes = Router();

transactionRoutes.post("/scan-receipt", upload.single("receipt"), scanReceiptController);
transactionRoutes.get("/download", downloadController);


export default transactionRoutes; 