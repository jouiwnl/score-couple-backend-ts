import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { Movie, MovieStatus } from "src/models/movie.model";
import { MovieService } from "src/services/movie.service";

@Controller("/movies")
export class MovieController {

  constructor(@Inject(MovieService) private readonly movieService: MovieService) {}

  @Get()
  async getAll(): Promise<Movie[]> {
    const movies = await this.movieService.getAll();

    return movies;
  };

  @Get("/colunas/:id")
  async getBySectionId(@Param("id") sectionId: number): Promise<Movie[]> {
    const movies = await this.movieService.getAllBySection(sectionId);

    return movies;
  }

  @Get(":id")
  async getById(@Param("id") movieId: number): Promise<Movie> {
    const movie = await this.movieService.getById(movieId);

    return movie;
  };

  @Post("/column/:id")
  async create(@Param("id") columnId: number, @Body() movie: Movie): Promise<Movie> {
    movie.status = MovieStatus.NOTSTARTED;
    const created = await this.movieService.create(movie, columnId);

    return created;
  };

  @Put(":id")
  async update(@Param("id") movieId: number, @Body() movie: Movie): Promise<{ message: string }> {
    this.movieService.update(movie, movieId);

    return { message: "Register updated with success" }
  };

  @Delete(":id")
  async delete(@Param("id") movieId: number): Promise<void> {
    this.movieService.delete(movieId);
  };

}