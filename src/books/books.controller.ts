import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookCategory } from './books.category.enum';
import { Books } from './books.entity';
import { BooksService } from './books.service';
import { BookStatus } from './books.status.enum';
import { CreateBookDto } from './dto/create-book.dto';
import { BookStatusValidationPipe } from './pipes/book-status-validation.pipe';
import { BookCategoryValidationPipe } from './pipes/book-category-validation.pipe';

import { BookResponseInterface } from './types/bookResponse.interface';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  //   @Get('/:id')
  //   getBookById(@Param('id', ParseIntPipe) id: number): Promise<Books> {
  //     return this.booksService.getBookById(id);
  //   }
  //   @Post()
  //   @UsePipes(ValidationPipe)
  //   createBook(@Body() createBookDto: CreateBookDto): Promise<Books> {
  //     return this.booksService.createBook(createBookDto);
  //   }

  @Post()
  async create(
    @Body('book') createBookDto: CreateBookDto,
  ): Promise<BookResponseInterface> {
    const book = await this.booksService.createBook(createBookDto);
    return this.booksService.buildBookResponse(book);
  }

  @Get(':slug')
  async getSingleBook(
    @Param('slug') slug: string,
  ): Promise<BookResponseInterface> {
    const book = await this.booksService.findBySlug(slug);
    return this.booksService.buildBookResponse(book);
  }

  @Delete(':slug')
  async deleteBook(@Param('slug') slug: string) {
    return await this.booksService.deleteBook(slug);
  }

  @Patch('/status/:slug')
  updateBookStatus(
    @Param('slug') slug: string,
    @Body('status', BookStatusValidationPipe) status: BookStatus,
  ): Promise<Books> {
    return this.booksService.updateBookStatus(slug, status);
  }

  @Patch('/category/:slug')
  updateBookCategory(
    @Param('slug') slug: string,
    @Body('bookCategory', BookCategoryValidationPipe)
    bookCategory: BookCategory,
  ): Promise<Books> {
    return this.booksService.updateBookCategory(slug, bookCategory);
  }

  @Get()
  getBooks(
    @Query(ValidationPipe) filterDto: GetBooksFilterDto,
  ): Promise<Books[]> {
    return this.booksService.getBooks(filterDto);
  }
}
