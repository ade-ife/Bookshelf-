import { EntityRepository, Repository } from 'typeorm';
import { BookCategory } from './books.category.enum';
import { Books } from './books.entity';
import { BookStatus } from './books.status.enum';
import { CreateBookDto } from './dto/create-book.dto';

@EntityRepository(Books)
export class BookRepository extends Repository<Books> {
  async createBook(createBookDto: CreateBookDto): Promise<Books> {
    const { title, author, bookCover, description, publicationDate } =
      createBookDto;
    const book = new Books();
    book.title = title;
    book.author = author;
    book.bookCover = bookCover;
    book.description = description;
    book.publicationDate = publicationDate;
    book.status = BookStatus.UNARCHIVED;
    book.bookCategory = BookCategory.GENERAL;
    return book;

    // const book = new Books();
    // Object.assign(book, createBookDto);
    // return book();
    // return 'test';
  }
}
