import { BaseEntity, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.model";
import { User } from "./user.model";

@Entity({ name: "workspaces" })
export class Workspace extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Section, section => section.workspace)
  colunas: Section[]

  @ManyToOne(type => User, user => user.workspaces)
  @JoinColumn({ name: "id_users", referencedColumnName: "id" })
  user: User;
}