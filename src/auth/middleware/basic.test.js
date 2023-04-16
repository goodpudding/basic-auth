'use strict';

const basicAuth = require('./basic');
const base64 = require('base-64');

const res = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

describe('Testing the basic Auth middleware', () => {
  test('Request contains all the proper credentials, expect next to be called', async () => {
    const encodedMessage = base64.encode('username:password');
    
    const request = {
      headers: {
          authorization: `Basic ${encodedMessage}`
      }
    };
    const response = res;
    const next = jest.fn();
    await basicAuth(request, response, next);
    expect(next).toHaveBeenCalled();
  });
  test('Request contains incorrect credentials, expect Unauthorized credentials', async () => {
    const request = {headers: {}};
    const response = res;
    const next = jest.fn();
    await basicAuth(request, response, next);
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.send).toHaveBeenCalledWith('Unauthorized credentials');
  });
});
