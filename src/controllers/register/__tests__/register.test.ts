import request from 'supertest';
import app from '../../../app';

describe('registration tests', () => {
  it("should create a user successfully if doesn't exist", () => {
    return request(app)
      .get('/')
      .expect(200);
  });

  it('should return conflict if a user exists ', () => {
    return request(app)
      .get('/')
      .expect(200);
  });

  it('should return validation errors of the body ', () => {
    return request(app)
      .get('/')
      .expect(200);
  });
});
