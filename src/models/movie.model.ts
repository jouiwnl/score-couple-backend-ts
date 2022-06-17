import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.model";

export enum MovieStatus {
  NOTSTARTED = "(B) Não começado",
  CANCELED = "(D) Cencelado",
  COMPLETED = "(C) Feito",
  DOING = "(A) Fazendo"
}

@Entity({ name: 'movies' })
export class Movie extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "original_id" })
    originalId: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "score" })
    score: number;

    @Column({
      type: "enum",
      enum: MovieStatus,
      default: MovieStatus.NOTSTARTED
    })
    status: MovieStatus;

    @Column({ name: "poster_url" })
    posterUrl: string;

    @Column({ name: "release_date" })
    releaseDate: string;

    @Column({ name: "runtime" })
    runtime: number;

    @Column({ name: "movie_description" })
    movieDescription: string;

    @Column({ name: "genre" })
    genre: string;

    @Column({ name: "date_to_see" })
    dateToSee: string;

    @Exclude()
    @ManyToOne(type => Section, section => section.movies)
    @JoinColumn({ name: "id_columns", referencedColumnName: "id" })
    column: Section;
}