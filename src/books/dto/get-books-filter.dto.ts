import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { BookCategory } from '../books.category.enum';
import { BookStatus } from '../books.status.enum';

export class GetBooksFilterDto {
  @IsOptional()
  @IsIn([BookStatus.ARCHIVED, BookStatus.UNARCHIVED])
  status: BookStatus;

  @IsOptional()
  @IsIn([
    BookCategory.COMIC,
    BookCategory.FANTASY,
    BookCategory.ACTION,
    BookCategory.THRILLER,
    BookCategory.CONTEMPORARY,
    BookCategory.GENERAL,
  ])
  bookCategory: BookCategory;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
