import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Item } from "./item.entity";

@Entity()
export class Company {

  @PrimaryColumn({ unique: true })
  NIT!: string

  @Column()
  name!: string

  @Column()
  address!: string

  @Column()
  phone!: string

  @OneToMany(() => Item, (item) => item.company, {
    cascade: true,
    eager: true,
  })
  items!: Item[]

  @Column({ default: false, nullable: false })
  isDeleted!: boolean
}
