import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /books - create', async () => {
    const response = await request(app.getHttpServer())
      .post('/books')
      .send({
        name: 'asd',
        price: 50000,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('asd');
    createdId = response.body.id;
  });

  it('GET /books - all', async () => {
    const response = await request(app.getHttpServer())
      .get('/books')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /books/:id - get one bookById', async () => {
    const response = await request(app.getHttpServer())
      .get(`/books/${createdId}`)
      .expect(200);

    expect(response.body.id).toBe(createdId);
    expect(response.body.name).toBe('asd');
  });

  it('PATCH /books/:id - update', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/books/${createdId}`)
      .send({ price: 60000 })
      .expect(200);

    expect(response.body.price).toBe(60000);
  });

  it('DELETE /books/:id - delete', async () => {
    await request(app.getHttpServer())
      .delete(`/books/${createdId}`)
      .expect(200);
  });
});
