import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.model";

export enum MediaStatus {
  NOTSTARTED = "NOTSTARTED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
  DOING = "DOING"
}

export enum MediaType {
  MOVIE = "MOVIE",
  SERIE = "SERIE"
}

@Entity({ name: 'medias' })
export class Media extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "original_id" })
    originalId: number;

    @Column({ name: "name" })
    name: string;

    @Column({ 
      name: "score", 
      nullable: true, 
      type: "decimal", 
      precision: 5,
      scale: 2 
    })
    score: number;

    @Column({
      type: "enum",
      enum: MediaStatus, 
      nullable: true
    })
    status: MediaStatus;

    @Column({ name: "poster_url", nullable: true })
    posterUrl: string;

    @Column({ name: "release_date", nullable: true })
    releaseDate: string;

    @Column({ name: "runtime", nullable: true })
    runtime: number;

    @Column({ name: "media_description", nullable: true })
    mediaDescription: string;

    @Column({ name: "genre", nullable: true })
    genre: string;

    @Column({ name: "date_to_see", nullable: true })
    dateToSee: string;

    @Column({
      name: "media_type",
      type: "enum",
      enum: MediaType, 
      nullable: true
    })
    mediaType: MediaType;

    @Exclude()
    @ManyToOne(type => Section, section => section.medias, {
      onDelete: 'CASCADE',
      orphanedRowAction: "delete"
    })
    @JoinColumn({ name: "id_columns", referencedColumnName: "id" })
    column: Section;
}