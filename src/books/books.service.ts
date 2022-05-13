import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BookRepository } from './bookRepository';
import { BookCategory } from './books.category.enum';
import { Books } from './books.entity';
import { BookStatus } from './books.status.enum';
import { CreateBookDto } from './dto/create-book.dto';
import { BookResponseInterface } from './types/bookResponse.interface';
import slugify from 'slugify';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private readonly bkrepo: Repository<Books>,
  ) {}
  //   constructor(
  //     @InjectRepository(BookRepository)
  //     @InjectRepository(Books)
  //     private bookRepository: BookRepository,
  //   ) {}
  //   async getBookById(id: number): Promise<Books> {
  //     const found = await this.bookRepository.findOne(id);
  //     if (!found) {
  //       throw new NotFoundException(`Book with ID "${id}" not found`);
  //     }
  //     return found;
  //   }
  //   async createBook(createBookDto: CreateBookDto): Promise<Books> {
  //     return this.bookRepository.createBook(createBookDto);
  //   }

  async createBook(createBookDto: CreateBookDto): Promise<Books> {
    const book = new Books();
    Object.assign(book, createBookDto);

    book.slug = this.getSlug(createBookDto.title);
    book.status = BookStatus.UNARCHIVED;
    book.bookCategory = BookCategory.GENERAL;
    return await this.bkrepo.save(book);
  }

  async deleteBook(slug: string): Promise<DeleteResult> {
    const book = await this.findBySlug(slug);

    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }
    return await this.bkrepo.delete({ slug });
  }

  async updateBookStatus(slug: string, status: BookStatus): Promise<Books> {
    const book = await this.findBySlug(slug);
    book.status = status;
    await book.save();
    return book;
  }

  async updateBookCategory(
    slug: string,
    bookCategory: BookCategory,
  ): Promise<Books> {
    const book = await this.findBySlug(slug);
    book.bookCategory = bookCategory;
    await book.save();
    return book;
  }

  async findBySlug(slug: string): Promise<Books> {
    return await this.bkrepo.findOne({ slug });
  }

  buildBookResponse(book: Books): BookResponseInterface {
    return { book };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }

  async getBooks(filterDto: GetBooksFilterDto): Promise<Books[]> {
    const { status, search } = filterDto;
    const query = this.bkrepo.createQueryBuilder('book');

    if (status) {
      query.andWhere('book.status = :status', { status });
    }

    if (search) {
      query.andWhere;
    }
    const books = await query.getMany();
    return books;
  }
}
