import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    CategoryModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
