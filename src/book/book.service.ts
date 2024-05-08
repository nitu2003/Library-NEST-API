import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById({ _id: id });

    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate({ _id: id }, {
        title: book.title,
        price: book.price
    }, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<{ message: string }> {
    const isDeleted = await this.bookModel.deleteOne({ _id: id });
    return { message: 'Document Deleted successfully' };
  }
}
