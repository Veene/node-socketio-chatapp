const expect = require('expect');
const {isRealString} = require('./validation')

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const nonString = 1;
        expect(isRealString(nonString)).toBe(false)
    })
    it('should reject string with only spaces', () => {
        const nonString = '  ';
        expect(isRealString(nonString)).toBe(false)
    })
    it('should allow string with non-space character', () => {
        const nonString = 'd';
        expect(isRealString(nonString)).toBe(true)
    })
})
