import { Module } from "@nestjs/common";
import { MovieController } from "src/controllers/movie.controller";
import { MovieService } from "src/services/movie.service";

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}