import request from 'supertest';
import app from '../src/app'; 

test('GET /products returns a list of products', (done) => {
  request(app)
    .get('/products')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toEqual(/* Your expected response data */);
      done();
    });
});

test('POST /orders creates a new order', (done) => {
  request(app)
    .post('/orders')
    .send(/* Your request body data */)
    .expect(201)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toEqual(/* Your expected response data */);
      done();
    });
});


test('GET /admin/discount returns a discount code', (done) => {
  request(app)
    .get('/admin/discount')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toHaveProperty('code');
      done();
    });
});

test('GET /admin/stats returns statistics data', (done) => {
  request(app)
    .get('/admin/stats')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('itemsPurchased');
      expect(res.body.data).toHaveProperty('totalPurchaseAmount');
      expect(res.body.data).toHaveProperty('discountList');
      expect(res.body.data).toHaveProperty('totalDiscount');
      done();
    });
});

