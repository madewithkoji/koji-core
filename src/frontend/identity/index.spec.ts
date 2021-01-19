/**
 * @jest-environment jsdom
 */

import { identity } from './index';

// @ts-ignore
//
// Need to set a timeout so that we can await the return value from
// a listener.
function mockMessage(message) {
  window.setTimeout(() => {
    window.postMessage(message, '*');
  }, 0);
}

describe('frontend/identify', () => {
  const USER_TOKEN = 'testUserToken';

  it('returns a user token', async () => {
    mockMessage({
      event: 'KojiAuth.TokenCreated',
      token: USER_TOKEN,
    });

    const userToken = await identity.getToken();

    expect(userToken).toBe(USER_TOKEN);
  });
});
