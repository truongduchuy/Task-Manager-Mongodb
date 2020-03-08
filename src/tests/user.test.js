const request = require('supertest');
const app = require('../app');
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Huy', 
    email: 'huy123@gmail.com',
    password: 'test1224323',
    tokens: [
        {
            token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
        }
    ]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Huy',
        email: 'huy0935903718@gmail.com',
        password: 'fssdfdsfds'
    }).expect(201)

    expect(response.body).toMatchObject({
        name: 'Huy',
        email: 'huy0935903718@gmail.com',
    })
})

test('Should log in success', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).send(200)

})

test('Should log in fail', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisiswrongpass'
    }).send(400)
})

test('Should get profile success', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send().expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me').send().expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send().expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()

})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send().expect(401)
})
