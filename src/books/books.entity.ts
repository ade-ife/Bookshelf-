import { Category } from 'src/category/category.entity';
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookCategory } from './books.category.enum';
import { BookStatus } from './books.status.enum';

@Entity()
export class Books extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  author: string;

  @Column()
  bookCover: string;

  @Column({ default: '' })
  description: string;

  @Column()
  publicationDate: string;

  @Column()
  status: BookStatus;

  @Column()
  bookCategory: BookCategory;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  //   @ManyToOne(() => Category, (category) => category.books, { eager: true })
  //   category: Category;
}
