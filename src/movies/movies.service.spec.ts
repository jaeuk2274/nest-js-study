import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should find a movie', () => {
      const title = 'test title',
        genres = ['test genre'],
        year = 2020;

      service.create({
        title,
        genres,
        year,
      });
      const id = 1;
      const movie = service.getOne(id);
      expect(movie).toBeDefined;
      expect(movie.id).toEqual(id);
      expect(movie.title).toEqual(title);
      expect(movie.year).toEqual(year);
      expect(movie.genres).toEqual(genres);
    });

    it('should throw NotFoundException', () => {
      const id = 999999;
      try {
        service.getOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${id} not found`);
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      const title = 'test title',
        genres = ['test genre'],
        year = 2020;

      service.create({
        title,
        genres,
        year,
      });

      const movieList = service.getAll();
      service.deleteOne(1);
      const deletMovieList = service.getAll();
      expect(deletMovieList.length).toEqual(movieList.length - 1);
    });

    it('should throw NotFoundException', () => {
      const id = 999999;
      try {
        service.deleteOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeMovie = service.getAll().length;

      const title = 'test title',
        genres = ['test genre'],
        year = 2020;

      service.create({
        title,
        genres,
        year,
      });

      const afterMovie = service.getAll().length;

      console.log(afterMovie, beforeMovie);
      expect(afterMovie).toEqual(beforeMovie + 1);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const title = 'test title',
        genres = ['test genre'],
        year = 2020;

      service.create({
        title,
        genres,
        year,
      });
      const id = 1;
      const updateTitle = 'update title';
      service.update(id, { title: updateTitle });
      const movie = service.getOne(id);
      expect(movie.title).toEqual(updateTitle);
    });

    it('should throw NotFoundException', () => {
      const id = 999999;
      try {
        service.update(id, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
