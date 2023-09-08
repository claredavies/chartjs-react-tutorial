import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import { useAppData } from '../useAppData';
// Adjust the path accordingly

const mockData = {
   "ClusterId": "j-3O1THJ9OLORHS",
   "ClusterName": "emr_job_cost_estimator_test_cluster",
   "Instances": [
       {
           "Ec2InstanceId": "i-0158846fe2ec78ad5",
           "InstanceType": "m5.xlarge",
           "EC2PricePerUnit": 0.1284,
           "EMRPricePerUnit": 0.005,
           "TotalPricePerUnit": 0.1334,
           "Memory": 16,
           "VCPU": 4,
           "Market": "SPOT",
           "State": "RUNNING",
           "CreationDateTime": "2023-08-18T10:30:43.564+01:00",
           "ReadyDateTime": "2023-08-18T10:39:26.631+01:00",
           "EndDateTime": null,
           "DurationHours": 0,
           "MemoryHours": 0.06023455697359534,
           "VCPUHours": 0.015058639243398834,
           "CostPerGBHour": 0.0083375,
           "CostPerVCoreHour": 0.03335,
           "TotalAccumulatedCost": 35.43480864208305
       }
   ],
   "Applications": [
       {
           "ApplicationId": "application_1692351496700_0008",
           "ApplicationName": "PythonPi",
           "State": "FINISHED",
           "FinalStatus": "FINISHED",
           "ElapsedTime": 11725,
           "MemorySeconds": 76732,
           "VcoreSeconds": 17,
           "AttributedCost": 0.057661223763954376
       }
   ]
};

// Enable fetch mock
fetchMock.enableMocks();

// Reset fetch mock before each test
beforeEach(() => {
  fetchMock.resetMocks();
});

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
    expect(result.current.jsonDat).toEqual(mockData);

    // check fetch only called once (no unnecessary calls)
    expect(fetchMock.mock.calls.length).toEqual(1);
});