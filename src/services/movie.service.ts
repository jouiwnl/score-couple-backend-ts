import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "src/models/movie.model";
import { Section } from "src/models/section.model";

@Injectable()
export class MovieService {

  async getAll(): Promise<Movie[]> {
    const movies = await Movie.find();
    return movies;
  }

  async getById(movieId: number): Promise<Movie> {
    const movie = await Movie.findOne({ where: { id: movieId } });

    if (!movie) {
      throw new NotFoundException(`Not found any movie with id: ${movieId}`);
    }

    return movie;
  }

  async create(movie: Movie, sectionId: number): Promise<Movie> {
    const section = await Section.findOne({ where: { id: sectionId } });

    if (!section) {
      throw new NotFoundException(`Not found any section with id: ${sectionId}`);
    }

    movie.column = section;
    const saved = await Movie.save(movie);

    return saved;
  };

  async update(movie: Movie, movieId: number): Promise<void> {
    const finded = await Movie.findOne({ where: { id: movieId } });

    if (!finded) {
      throw new NotFoundException(`Not found any movie with id: ${movieId}`);
    }

    await Movie.update({ id: movieId }, movie);
  }

  async delete(movieId: number): Promise<void> {
    const finded = await Movie.findOne({ where: { id: movieId } });

    if (!finded) {
      throw new NotFoundException(`Not found any movie with id: ${movieId}`);
    }

    await Movie.delete({ id: movieId });
  }



}