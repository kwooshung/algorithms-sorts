import tim from '.';

describe('定序排序', () => {
  it('对 1个元素数组 进行排序', () => {
    const input = [3];
    const expected = [3];
    const result = tim(input);

    expect(result).to.deep.equal(expected);
  });

  it('对 数字数组 进行排序', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6];
    const expected = [1, 1, 2, 3, 4, 5, 6, 9];
    const result = tim(input);

    expect(result).to.deep.equal(expected);
  });

  it('对 字符串数组 进行排序', () => {
    const input = ['banana', 'apple', 'cherry'];
    const expected = ['apple', 'banana', 'cherry'];
    const result = tim(input);

    expect(result).to.deep.equal(expected);
  });

  it('对 字符串和数字数组 进行排序', () => {
    const input = [3, 1, 4, 1, 'banana', 'b1', 5, 3, 5, 8, 9, 7, 9, 3, 'apple', 'cherry', 5, 9, 2, 6];
    const expected = [1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 9, 9, 'apple', 'b1', 'banana', 'cherry'];
    const result = tim(input);

    expect(result).to.deep.equal(expected);
  });

  it('不传递 modifyOriginal 参数，应该修改原数组', () => {
    const input = [3, 2, 1, 10];
    const expected = [1, 2, 3, 10];
    tim(input);
    expect(input).toEqual(expected);
  });

  it('传递 modifyOriginal 为 false，不应修改原数组', () => {
    const input = [3, 2, 1];
    const expected = [1, 2, 3];
    const result = tim(input, false);
    expect(input).toEqual(input);
    expect(result).toEqual(expected);
  });

  it('不传递 compareFunction 参数，使用默认比较函数', () => {
    const input = ['b', 'a', 'c'];
    const expected = ['a', 'b', 'c'];
    const result = tim(input);
    expect(result).toEqual(expected);
  });

  it('使用自定义 compareFunction 进行逆序排序', () => {
    const customCompare = (a: string | number, b: string | number) => (a < b ? 1 : -1);
    const input = [1, 3, 2];
    const expected = [3, 2, 1];
    const result = tim(input, true, customCompare);
    expect(result).toEqual(expected);
  });

  it('传递自定义的比较函数，用于混合类型数组', () => {
    const input = [3, 'banana', 2, 'apple'];
    const expected = [2, 3, 'apple', 'banana'];
    const result = tim(input, true);
    expect(result).toEqual(expected);
  });

  it('对空数组进行排序', () => {
    const input: any = [];
    const expected: any = [];
    const result = tim(input);
    expect(result).toEqual(expected);
  });

  it('对大型数组进行排序', () => {
    const input = Array.from({ length: 64 }, () => Math.floor(Math.random() * 64));
    const expected = [...input].sort((a, b) => a - b);
    const result = tim(input);
    expect(result).toEqual(expected);
  });

  it('使用不同的 runSize 进行排序', () => {
    const input = [5, 4, 3, 2, 1];
    const expected = [1, 2, 3, 4, 5];
    const resultWithSmallRun = tim(input, true, undefined, false, 5);
    const resultWithLargeRun = tim(input, true, undefined, false, 100);
    expect(resultWithSmallRun).toEqual(expected);
    expect(resultWithLargeRun).toEqual(expected);
  });

  it('反转排序', () => {
    const input = [6, 5, 7, 'banana', 'apple', 3, 2];
    const expected = ['banana', 'apple', 7, 6, 5, 3, 2];
    const result = tim(input, true, undefined, true);
    expect(result).toEqual(expected);
  });
});
