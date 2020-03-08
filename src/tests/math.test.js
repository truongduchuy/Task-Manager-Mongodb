const { calculateTip, add } = require('./math');

test('should calculate total with tip',() => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13)
})

// test('should add two numbers', () => {
//     add(2, 3).then(sum => {
//         expect(sum).toBe(6);
//     })
// })

test('should add two numbers promise', (done) => {
    add(2, 3).then(sum => {
        expect(sum).toBe(5);
        done();
    })
})

test('should add two numbers async/await', async () => {
    const sum = await add(10, 5);
    expect(sum).toBe(15);
})