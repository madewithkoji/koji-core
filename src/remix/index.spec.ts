/**
 * @jest-environment jsdom
 */

import { remix } from './index';

it('adds an observer', async () => {
  const fn = () => {};
  remix.subscribe(fn);
});
