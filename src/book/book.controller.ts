import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dts';

@Controller('/book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/getallBooks')
  async getAllbooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post('/createbook')
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  @Get('/getbook/:id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Patch('/updateBook/:id')
  async updateBook(
    @Param('id')
    id: string, 
    @Body()
    book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  @Delete('/:id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<{ message: string }> {
    return this.bookService.deleteById(id);
  }
}

