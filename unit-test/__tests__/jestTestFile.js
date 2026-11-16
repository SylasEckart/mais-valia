const {describe} = require("@jest/globals");


//todo mock window inside file modules.js
const {FunctionModules} = require("../../extension/src/modules.js");



describe("All tests", () => {

    const spy = jest.spyOn(FunctionModules, 'window');
    spy.mockImplementation(() => 'mocked implementation');

    test("getSufixOfCurrency", () => {

        expect(1).toEqual(1); // New test
    });
});
