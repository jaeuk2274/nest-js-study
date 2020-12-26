import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', () => {
    const title = 'test title',
      genres = ['test genre'],
      year = 2020;

    it('(GET)', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('(POST)', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title,
          genres,
          year,
        })
        .expect(201);
    });

    it('(DELETE)', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer).get('/movies/1').expect(200);
    })
    it.todo('DELETE');
    it.todo('PATCH');
  });

  // it('/movies (GET)', () => {
  //   return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
  // });
});
