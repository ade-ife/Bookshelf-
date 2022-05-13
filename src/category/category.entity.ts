import { Books } from 'src/books/books.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  //   @OneToMany(() => Books, (book) => book.category)
  //   books: Books[];
}
