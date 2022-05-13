import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  bookCover: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  publicationDate: string;
}
