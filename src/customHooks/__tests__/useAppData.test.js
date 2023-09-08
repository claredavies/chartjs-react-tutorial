import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import { useAppData } from '../useAppData';
import { mockData } from '../../mocks/mockJsonData'
import transformData from '../../components/dataTransform';

//TESTING
//1. The hook fetches data correctly.
//2. The hook calls the transformData function when necessary.
//3. The transformed data is stored correctly.
//4. You can mock the transformData function here just to ensure it's called, without bothering about the exact transformation.

// Enable fetch mock
fetchMock.enableMocks();

// Reset fetch mock before each test
beforeEach(() => {
  fetchMock.resetMocks();
});

// jest needs to mock the module before mocking the function
jest.mock('../../components/dataTransform', () => ({
  __esModule: true, // this property makes it work smoothly with ES6 imports
  default: jest.fn()
}));

//Check if fetch is called on initial render
// it is a function from Jest which defines a single test
// second argument is a callback function
it('fetches data on initial render', async () => {
    // the next time fetch is called (in fetchData where call API using fetch) instead of returning the API response
    // the mock response is returned
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // render hook is used to test a custom Hook - in this case useAppData()
    // renderHook returns an object containing several properties and utility methods to help with testing.
    // waitForNextUpdate: This is one of the utility methods provided by the renderHook result.
    // It's particularly useful for waiting for asynchronous operations to complete in the hook (like data fetching).
    const { result, waitForNextUpdate } = renderHook(() => useAppData());

    // Check that jsonData is initially null
    expect(result.current.jsonData).toBeNull();

    await waitForNextUpdate();

    // Check that jsonData is now populated with mockData
    expect(result.current.jsonData).toEqual(mockData);

    // check fetch only called once (no unnecessary calls)
    expect(fetchMock.mock.calls.length).toEqual(1);
});

it('calls the transformData function when necessary', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // Mock the implementation for this test case
    transformData.mockImplementation((data, type) => {
        return data;
    });

    const { result, waitForNextUpdate } = renderHook(() => useAppData());

    await waitForNextUpdate();

    // Check if transformData was called
    expect(transformData).toHaveBeenCalled();

    // Clean up mock after test
    transformData.mockClear();
});

//check calls transformData when dataType changes






