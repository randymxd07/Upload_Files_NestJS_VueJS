import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('file')
export class FileController {

  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1048576, message: `The file must be less than or equal to 1 MB` }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    ) file: Express.Multer.File) {

    return this.fileService.uploadFile(file);

  }

  @Get(':fileName')
  getImage(@Param('fileName') fileName: string, @Res() res: Response): void {
    return this.fileService.getImage(fileName, res);
  }

}
