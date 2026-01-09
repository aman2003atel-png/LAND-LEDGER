import { Request , Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { scanReceiptService } from "../services/transaction.service";
import { Parser } from "json2csv";
import path from 'path';
import fs  from "fs";

const parserObj = new Parser();

export const scanReceiptController = asyncHandler(
    async (req: Request, res: Response) => {
        const file = req?.file;

        const result = await scanReceiptService(file);
        console.log(result);

        // CONVERTING JSON TO CSV FILE AT BACKEND SIDE
         const csv = parserObj.parse(result);

        console.log(csv);
        fs.writeFileSync('./src/csvfolder/data.csv',csv);

        
        return res.status(HTTPSTATUS.OK).json({
            message: "Recipt scanned successfully",
            data: result,
        })
    }
);

export const downloadController = asyncHandler(
    async (req: Request, res: Response) => {
      // i am trying to creating service for sending file from backend to frontend
      // I am trying to create Service Section of this contoller also but some 
      // await  scanReceiptService(res);
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
)