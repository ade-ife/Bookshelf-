import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BookStatus } from '../books.status.enum';

export class BookStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [BookStatus.ARCHIVED, BookStatus.UNARCHIVED];
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
