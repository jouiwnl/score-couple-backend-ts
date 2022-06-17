import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Workspace } from "./workspace.model";

@Entity({ name: "usuarios" })
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ name: "avatar_url" })
  avatarUrl: string;

  @OneToMany(type => Workspace, workspace => workspace.user)
  workspaces: Workspace[]
}