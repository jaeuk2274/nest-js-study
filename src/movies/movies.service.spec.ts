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

      const movie = service.getOne(1);
      expect(movie).toBeDefined;
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual(title);
      expect(movie.year).toEqual(year);
      expect(movie.genres).toEqual(genres);
    });

    it('should throw 404 error', () => {
      const id = 999999;
      try {
        service.getOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${id} not found`);
      }
    });
  });
});
