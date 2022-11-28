import { describe, it, expect } from 'vitest';
import { pipe, map, filter, reduce } from './fx';

const products = [
  { name: '반팔티', price: 15000, quantity: 1, is_selected: true },
  { name: '긴팔티', price: 20000, quantity: 2, is_selected: false },
  { name: '핸드폰케이스', price: 15000, quantity: 3, is_selected: false },
  { name: '후드티', price: 30000, quantity: 4, is_selected: false },
  { name: '바지', price: 25000, quantity: 5, is_selected: true },
];

describe('functions test', () => {
  it('products is defined', () => {
    expect(products).toBeDefined();
  });

  it('calculate total quantity', () => {
    const result = pipe(
      (products) => products,
      map((product) => product.quantity),
      reduce((a, b) => a + b)
    )(products);

    expect(result).toBe(15);
  });

  it('calculate total price', () => {
    const result = pipe(
      (products) => products,
      map((product) => product.price * product.quantity),
      reduce((a, b) => a + b)
    )(products);

    expect(result).toBe(345000);
  });

  it('calculate number selected', () => {
    const result = filter((product) => product.is_selected, products).length;

    expect(result).toBe(2);
  });
});
