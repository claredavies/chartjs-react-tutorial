import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import { useAppData } from '../useAppData';
import { mockData } from '../../mocks/mockJsonData'
import transformData from '../../components/dataTransform';

// Enable fetch mock
fetchMock.enableMocks();

jest.mock('../../components/dataTransform', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('useAppData hook', () => {
    // Reset fetch mock and clear all mocks before each test
    beforeEach(() => {
      fetchMock.resetMocks();
      jest.clearAllMocks();
      jest.resetModules();
    });

    it('checking setJsonData and setSelectedDataType called on initial render', async () => {
        // Locally mock the hooks for this test
        jest.doMock('../useAppDataStates', () => ({
          useJsonDataState: jest.fn().mockReturnValue([null, jest.fn()]),
          useSelectedDataTypeState: jest.fn().mockReturnValue(['Instances', jest.fn()]),
          useTransformedInstanceDataState: jest.fn().mockReturnValue([[], jest.fn()])
        }));

        // Now you need to require (import) the function/module AFTER the mock
        const { useAppData } = require('../useAppData'); // Replace with the actual path to your useAppData
        const mockedHooks = require('../useAppDataStates');

        const { result, waitForNextUpdate } = renderHook(() => useAppData());

        // Now you can assert that the mocked function has been called
        expect(mockedHooks.useJsonDataState).toHaveBeenCalled();
        expect(mockedHooks.useTransformedInstanceDataState).toHaveBeenCalled();
      });

    it('fetches data on initial render', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const { waitForNextUpdate } = renderHook(() => useAppData());
        await waitForNextUpdate();

        expect(fetchMock.mock.calls.length).toEqual(1);
    });

    it('transforms data on initial render when json is not null', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockData));
        transformData.mockImplementation((data, type) => data);

        const { result, waitForNextUpdate } = renderHook(() => useAppData());

        expect(result.current.jsonData).toBeNull();
        expect(transformData).not.toHaveBeenCalled();
        await waitForNextUpdate();

        expect(result.current.jsonData).toEqual(mockData);
        expect(transformData).toHaveBeenCalled();
    });

    describe('transformData calls based on selectedDataType changes', () => {
        beforeEach(() => {
            fetchMock.mockResponseOnce(JSON.stringify(mockData));
            transformData.mockImplementation((data, type) => data);
        });

        it('calls transformData when selectedDataType changes', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useAppData());
            await waitForNextUpdate();

            expect(transformData).toHaveBeenCalledTimes(1);

            act(() => result.current.setSelectedDataType('Applications'));
            expect(transformData).toHaveBeenCalledTimes(2);

            act(() => result.current.setSelectedDataType('Applications'));
            expect(transformData).toHaveBeenCalledTimes(2);

            act(() => result.current.setSelectedDataType('Instances'));
            expect(transformData).toHaveBeenCalledTimes(3);
        });
    });
});