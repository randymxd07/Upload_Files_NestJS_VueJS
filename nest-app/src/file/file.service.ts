import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {

    /**------------------------------------
     * UPLOAD FILE FUNCTION
     * @param {Express.Multer.File} file
     * @returns { url: string; }
    ---------------------------------------*/
    uploadFile(file: Express.Multer.File): { url: string; } {

        // DEFINES THE ROUTE OF THE DESTINATION DIRECTORY //
        const uploadDir = path.join(__dirname, '..', '..', 'src', 'assets', 'images');

        // VERIFY IF THE DIRECTORY EXISTS, IF NOT, CREATE IT //
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // USE RECURSIVE: TRUE TO CREATE NESTED DIRECTORIES IF THEY DO NOT EXIST //
        }

        // BUILD THE FULL ROUTE OF THE FILE //
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(uploadDir, fileName);

        // SAVE THE FILE IN THE FILE SYSTEM //
        fs.writeFileSync(filePath, file.buffer);

        // BUILD AND RETURN THE ACCESS URL //
        const baseUrl = 'http://localhost:3000'; // CHANGE THIS TO THE URL BASE OF YOUR APPLICATION //
        const fileUrl = `${baseUrl}/file/${fileName}`;

        return {
            url: fileUrl,
        };

    }

    /**---------------------------
     * GET IMAGE FUNCTION
     * @param {string} fileName
     * @param {Response} res
     * @returns {void}
    -------------------------------*/
    getImage(fileName: string, res: Response): void {

        // DEFINES THE ROUTE OF THE DIRECTORY OF THE IMAGES //
        const uploadDir = path.join(__dirname, '..', '..', 'src', 'assets', 'images');

        // BUILD THE FULL ROUTE OF THE FILE //
        const filePath = path.join(uploadDir, fileName);

        // VERIFY IF THE FILE EXISTS //
        if (fs.existsSync(filePath)) {

            // IF IT EXISTS, READ THE FILE AND SEND IT IN RESPONSE //
            const imageStream = fs.createReadStream(filePath);
            imageStream.pipe(res);

        } else {

            // IF IT DOES NOT EXIST, SEND AN ANSWER 404 //
            throw new NotFoundException('Image not found');

        }

    }

}
