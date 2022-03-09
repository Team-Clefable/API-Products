import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s'
}

const randomNumber = (max, min) => (
  Math.floor(Math.random() * (max - 1 + min) + min)
);

let productId = randomNumber(1000011, 1);

export default function () {
  const res = http.get(`http://localhost:3000/products/${productId}/styles`);
  //console.log('Response time was ' + String(res.timings.duration) + ' ms');

  sleep(0.1);
}