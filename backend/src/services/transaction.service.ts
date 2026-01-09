import { Response } from "express";
import axios from "axios";
import { genAI, genAIModel } from "../config/google-ai.config";
import { BadRequestException } from "../utils/app-error";
import { createPartFromBase64, createUserContent } from "@google/genai";
import { receiptPrompt } from "../utils/prompt";
import path from 'path';
import fs  from "fs";


export const scanReceiptService = async (file: Express.Multer.File | undefined) => {
  if(!file) throw new BadRequestException("No file uploaded");
  try {
    if(!file.path) throw new BadRequestException("failed to upload file");

    console.log(file.path);

    const responseData = await axios.get(file.path, {
      responseType: "arraybuffer",
    });

    const base64String = Buffer.from(responseData.data).toString("base64");

    if(!base64String) throw new BadRequestException("Could not process file");

    const result = await genAI.models.generateContent({
      model: genAIModel,
      contents: [
        createUserContent([
          receiptPrompt,
          createPartFromBase64(base64String, file.mimetype),
        ]),
      ],
      config: { temperature: 0, topP: 1, responseMimeType: "application/json",  },
    });

    const response = result.text;
    const cleanedText = response?.replace(/```(?:json)?\n?/g, "").trim();

    if(!cleanedText) 
      return {
      error: "Could not read recipt content",
    };
    const data = JSON.parse(cleanedText);

    if(!data.amount || !data.date) {
      return { error : "Receipt missing required information"};    
    }

    return {
      title: data.title || "Receipt",
      amount: data.amount,
      date: data.date,
      description: data.description,
      category: data.category,
      paymentMethod: data.paymentMethod,
      type: data.type,
      // receiptUrl: file.path,
    };

  } catch (error) {
    return { error: "Reciept scanning service unavailable"};
  }
}; 

export const SendReceiptService = async ( res: Response): Promise<void>=>{
   const filePath = path.join(__dirname, '..', 'csvfolder', 'data.csv');
       res.download(filePath, 'data.csv', (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error downloading file');
      } else {
        // Delete file after response is sent
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error deleting file:', unlinkErr);
          } else {
            console.log('File deleted after sending.');
          }
        });
      }
    });
} 