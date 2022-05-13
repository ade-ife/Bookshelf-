import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { BookRepository } from './bookRepository';
import { BooksController } from './books.controller';
import { Books } from './books.entity';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Books]), UserModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
