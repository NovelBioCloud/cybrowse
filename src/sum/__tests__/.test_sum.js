jest.unmock('../sum'); // unmock to use the actual implementation of sum

describe('sum', () => {
	it('adds 1 + 2 to equal 3', () => {
		const sum = require('../sum');
		expect(sum(1, 2)).toBe(3);
	});

});
describe('adler32', function () {
	it('generates differing checksums', function () {
		expect(1).not.toBe(2);
	});
	it('generates differing checksums1', function () {
		expect(1).not.toBe(2);
	});
});
