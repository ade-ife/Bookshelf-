import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BookCategory } from '../books.category.enum';

export class BookCategoryValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    BookCategory.COMIC,
    BookCategory.FANTASY,
    BookCategory.ACTION,
    BookCategory.THRILLER,
    BookCategory.CONTEMPORARY,
    BookCategory.GENERAL,
  ];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
