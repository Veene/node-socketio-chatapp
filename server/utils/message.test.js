var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text)
        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({
            from,
            text
        }) 
    })
});
describe('generateLocationMessage', () => {
    it('should generate correct message object', () => {
        const from = 'John';
        const latitude = '100';
        const longitude = '50';
        const message = generateLocationMessage(from, latitude, longitude)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({
            from: from,
            url: `https://www.google.com/maps/@100,50`,
        })
    })
})