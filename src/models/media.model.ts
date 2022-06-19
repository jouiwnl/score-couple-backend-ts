import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.model";

export enum MediaStatus {
  NOTSTARTED = "NOTSTARTED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
  DOING = "DOING"
}

@Entity({ name: 'medias' })
export class Media extends BaseEntity {
    
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
      enum: MediaStatus
    })
    status: MediaStatus;

    @Column({ name: "poster_url" })
    posterUrl: string;

    @Column({ name: "release_date" })
    releaseDate: string;

    @Column({ name: "runtime" })
    runtime: number;

    @Column({ name: "media_description" })
    mediaDescription: string;

    @Column({ name: "genre" })
    genre: string;

    @Column({ name: "date_to_see" })
    dateToSee: string;

    @Exclude()
    @ManyToOne(type => Section, section => section.medias)
    @JoinColumn({ name: "id_columns", referencedColumnName: "id" })
    column: Section;
}