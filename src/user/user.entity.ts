import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ default: () => 'NOW()' })
  ts_created: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
