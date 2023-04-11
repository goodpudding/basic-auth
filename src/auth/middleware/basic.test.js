'use strict';

const basic = require('./basic');
const base64 = require('base-64');

describe('Testing the basic Auth middleware', () =>{
  test('Request contains all the proper credentials, expect next to be called', () => {
    const endcodedMessage = base64.encode('username:password');
    
    const request = {
      headers: {
          authorization: `Basic ${endcodedMessage}`
      }
    };
    const response = {
      send: 'I am a string',
      status: jest.fn(),
      json: {"I am JSON": 10000},
    };
    const next = jest.fn();
    basic(request, response, next);
    expect(next).toHaveBeenCalled();
  });
  test('Request contains all the proper credentials, expect next to be called', () => {
    const request = {headers:{}};
    const response = {
      send: jest.fn(()=>response),
      status: jest.fn(()=>response),
      json: jest.fn(()=>response),
    };
    const next = jest.fn();
    basic(request, response, next);
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.send).toHaveBeenCalledWith('Invalid login');
  });
})