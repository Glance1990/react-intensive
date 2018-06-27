// npm run test -- --verbose
// yarn test --verbose

import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('sum function:', () => {

    test('"sum should be a function"', () => {
        expect(typeof sum).toBe('function');
    });

    test('"sum should be a function"', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('should add two numbers', () => {
        expect(sum(2,3)).toBe(5);
    });

});

describe('instruments module:', () => {

    describe('sum function', () => {
        debugger;
        test('"sum should be a function"', () => {
            expect(typeof sum).toBe('function');
        });

        test('"sum should be a function"', () => {
            debugger;
            expect(sum).toBeInstanceOf(Function);
        });

        test('should add two numbers', () => {
            const a = 2;
            const b = 3;
            const result = a + b;

            expect(sum(2,3)).toBe(result);
        });

        test('should throw if firs arg in not a number', () => {
            const result = () => sum('fff', 2);

            expect(result).toThrow();
        });

        test('should throw if firs arg in not a number', () => {
            const result = () => sum(3, 'sdsdsd');

            expect(result).toThrow('Operand two should be a number');
        });
    });


    describe('getUniqueID function', () => {

        test('Two Ids should not match', () => {
            return expect(getUniqueID()).not.toBe(getUniqueID());
        })

        test('Test default number length', () => {
            return expect(getUniqueID()).toHaveLength(15);
        })

        test('Id should be of 10 symbols', () => {
            return expect(getUniqueID(10)).toHaveLength(10);
        })

        test('Test that id should be a string', () => {
            return expect(getUniqueID()).toBeInstanceOf(String);
        })


    })

    describe('getFullApiUrl function', () => {

        test('Test that id should be a string', () => {
            return expect( typeof getFullApiUrl("https://lab.lectrum.io/react/api", "ecIqjXayz6K2") ).toBe("string");
        })


    });


    describe('getFullApiUrl function', () => {

    })

});



