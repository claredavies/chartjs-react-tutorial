import transformData from '../dataTransform';
import { mockData } from '../../mocks/mockJsonData'

describe('dataTransform function', () => {
    it('transforms data to Applications correctly', () => {
        const result = transformData(mockData, 'Applications');

        expect(result[0].ApplicationId).toEqual(mockData.Applications[0].ApplicationId);
        expect(result[0].ApplicationId).toEqual(mockData.Applications[0].ApplicationId)
        expect(result[0].ApplicationName).toEqual(mockData.Applications[0].ApplicationName)
        expect(result[0].State).toEqual(mockData.Applications[0].State)
        expect(result[0].ElapsedTime).toEqual(mockData.Applications[0].ElapsedTime)
        expect(result[0].MemorySeconds).toEqual(mockData.Applications[0].MemorySeconds)
        expect(result[0].AttributedCost).toEqual(mockData.Applications[0].AttributedCost)
    });

    it('transforms data to Instances correctly', () => {
        const result = transformData(mockData, 'Instances');

        expect(result[0].InstanceType).toEqual(mockData.Instances[0].InstanceType)
        expect(result[0].TotalPricePerUnit).toEqual(mockData.Instances[0].TotalPricePerUnit)
        expect(result[0].EC2PricePerUnit).toEqual(mockData.Instances[0].EC2PricePerUnit)
        expect(result[0].EMRPricePerUnit).toEqual(mockData.Instances[0].EMRPricePerUnit)
        expect(result[0].Ec2InstanceId).toEqual(mockData.Instances[0].Ec2InstanceId)
        expect(result[0].State).toEqual(mockData.Instances[0].State)
        expect(result[0].Market).toEqual(mockData.Instances[0].Market)
        expect(result[0].MemoryHours).toEqual(mockData.Instances[0].MemoryHours)
        expect(result[0].VCPUHours).toEqual(mockData.Instances[0].VCPUHours)
        expect(result[0].CostPerGBHour).toEqual(mockData.Instances[0].CostPerGBHour)
        expect(result[0].CostPerVCoreHour).toEqual(mockData.Instances[0].CostPerVCoreHour)
        expect(result[0].TotalAccumulatedCost).toEqual(mockData.Instances[0].TotalAccumulatedCost)
    });

    // Add other tests for edge cases, other transformation types, etc.
});
