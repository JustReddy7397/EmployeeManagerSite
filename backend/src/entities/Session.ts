import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { ISession } from 'connect-typeorm';

@Entity({ name: 'session' })
export class Session implements ISession {
  @Index()
  @Column('bigint')
  expiredAt: number;

  @PrimaryColumn('varchar', { length: 255 })
  id = '';

  @Column('text')
  json = '';

  @Column('bigint')
  @DeleteDateColumn()
  destroyedAt?: Date;
}