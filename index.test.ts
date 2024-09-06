import { hey } from '.';

describe('hey', () => {
  test('greets', () => {
    expect(hey("Joe")).toEqual("Hey, Joe")
  });
});
