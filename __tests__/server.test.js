'use strict';

const supertest = require('supertest');
const server = require('../src/server');
const { Users } = require('../src/models');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { expect } = require('@jest/globals');

const request = supertest(server.app);

beforeAll( async() => {
    await Users.sync();
});

afterAll( async() => {
    await Users.drop();
});

describe('Testing routes', () => {
    let expectedUser = {};
    let usrObj = {};
    test('Test that signup works', async() => {
        usrObj = {
            username: 'Bob',
            password: 'BobBanana2!#',
        };

        const newUser = await request.post('/signup').send(usrObj);

        expectedUser = await Users.findOne({where: {username: usrObj.username}});
        const compared = await bcrypt.compare(usrObj.password, expectedUser.password);

        expect(newUser.body.username).toEqual(expectedUser.username);
        expect(compared).toBeTruthy();
    });

    test('Test that sign-in works', async() => {
        const resp = await request.post('/signin').auth(usrObj.username, usrObj.password);
        expect(resp.text).toEqual('Log-in successful!');
        expect(resp.status).toEqual(200);
    });

    test('Bad route returns 404', async() => {
        const resp = await request.post('/signout');
        expect(resp.status).toEqual(404);
    });

    test('Bad method returns 404', async() => {
        const resp = await request.get('/signin');
        expect(resp.status).toEqual(404);
    });
});