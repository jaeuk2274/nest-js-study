import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie-dto';
import { Movie } from './entites/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number) {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  delete(@Param('id') movieId: number) {
    return this.movieService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData) {
    this.movieService.update(movieId, updateData);
  }
}
