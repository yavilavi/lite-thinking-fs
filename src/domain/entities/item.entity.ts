import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Company } from "./company.entity";

@Entity()
export class Item {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  companyNIT!: string

  @Column()
  stock!: number

  @ManyToOne(() => Company, (company) => company.items, {
    nullable: false,
  })
  company!: Company
}
