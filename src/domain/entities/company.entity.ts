import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Item } from "./item.entity";

@Entity()
export class Company {

  @PrimaryColumn({ unique: true })
  NIT!: string

  @Column({ nullable: false })
  name!: string

  @Column({ nullable: false })
  address!: string

  @Column({ nullable: false })
  phone!: string

  @OneToMany(() => Item, (item) => item.company, {
    cascade: true,
    eager: true,
  })
  items!: Item[]

  @Column({ default: false, nullable: false })
  isDeleted!: boolean
}
