/**
 * @jest-environment jsdom
 */

import { remix } from './index';

beforeEach(() => {
  // @ts-ignore
  remix.observers = [];
});

it('adds an observer', () => {
  const fn = () => {};
  remix.subscribe(fn);

  // @ts-ignore
  expect(remix.observers.length).toBe(1);
});

it('removes an observer', () => {
  const fn = () => {};
  const unsubscribe = remix.subscribe(fn);

  // @ts-ignore
  expect(remix.observers.length).toBe(1);

  unsubscribe();

  // @ts-ignore
  expect(remix.observers.length).toBe(0);
});

it('notifies an observer', () => {
  let val = 0;

  const fn = () => {
    val += 1;
  };

  remix.subscribe(fn);

  // @ts-ignore
  remix.notify(true, {});

  // @ts-ignore
  expect(val).toBe(1);
});
