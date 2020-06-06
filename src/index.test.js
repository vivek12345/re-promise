import { retryPromise } from './index';

const fetchData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: 'valid' });
    });
  });
};

describe('re-promise', () => {
  test('retryPromise should be defined', () => {
    expect(retryPromise).toBeDefined();
  });
  test('retryPromise should return the response in case of a success resp', async () => {
    const resp = await retryPromise({
      fn: () => fetchData()
    });
    expect(resp).toEqual({ data: 'valid' });
  });
  test('retryPromise should call the promise fn 3 times where 3 is the dfeault retries count', async () => {
    const mockedFetchDataFn = jest.fn();
    mockedFetchDataFn.mockRejectedValue({ response: { status: 502 } });
    try {
      await retryPromise({
        fn: () => mockedFetchDataFn()
      });
    } catch (e) {
      expect(mockedFetchDataFn).toHaveBeenCalledTimes(4);
    }
  });
  test('retryPromise should call the promise fn n + 1 times where n is the retries count passed', async () => {
    const mockedFetchDataFn = jest.fn();
    mockedFetchDataFn.mockRejectedValue({ response: { status: 502 } });
    try {
      await retryPromise({
        fn: () => mockedFetchDataFn(),
        retries: 4
      });
    } catch (e) {
      expect(mockedFetchDataFn).toHaveBeenCalledTimes(5);
    }
  });
  test('retryPromise should stop retrying if the retryOn fn returns false', async () => {
    const mockedFetchDataFn = jest.fn();
    mockedFetchDataFn.mockRejectedValue({ response: { status: 404 } });
    try {
      await retryPromise({
        fn: () => mockedFetchDataFn(),
        retryOn: e => [500, 502].includes(e.response.status)
      });
    } catch (e) {
      expect(mockedFetchDataFn).toHaveBeenCalledTimes(1);
    }
  });
  test('retryPromise print debug info using console.group when debug flag is set to true', async () => {
    const mockedFetchDataFn = jest.fn();
    const mockedConsoleGroup = jest.spyOn(console, 'group');
    const mockedConsoleDir = jest.spyOn(console, 'dir').mockImplementation(() => {});
    mockedConsoleGroup.mockImplementation(() => {});
    mockedFetchDataFn.mockRejectedValue({ response: { status: 502 } });
    try {
      await retryPromise({
        fn: () => mockedFetchDataFn(),
        retryOn: e => [500, 502].includes(e.response.status),
        debug: true
      });
    } catch (e) {
      expect(mockedConsoleGroup).toHaveBeenCalledTimes(3);
    }
    mockedConsoleGroup.mockReset();
    mockedConsoleDir.mockReset();
  });
  test('retryPromise should return the error object after retry', async () => {
    const mockedFetchDataFn = jest.fn();
    mockedFetchDataFn.mockRejectedValue({ response: { status: 404 } });
    try {
      await retryPromise({
        fn: () => mockedFetchDataFn(),
        retryOn: e => [500, 502].includes(e.response.status)
      });
    } catch (e) {
      expect(e).toEqual({ response: { status: 404 } });
    }
  });
});
