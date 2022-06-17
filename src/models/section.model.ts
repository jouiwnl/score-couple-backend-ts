import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Movie } from "./movie.model";
import { Workspace } from "./workspace.model";

@Entity({ name: "colunas" })
export class Section extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => Workspace, workspace => workspace.colunas)
  @JoinColumn({ name: "id_workspaces", referencedColumnName: "id" })
  workspace: Workspace;

  @OneToMany(type => Movie, movie => movie.column)
  movies: Movie[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;
}