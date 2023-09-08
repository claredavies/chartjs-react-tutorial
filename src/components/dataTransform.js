// dataTransform.js

/**
 * Transforms the given data into the desired format.
 * @param {Object} jsonData - The data to be transformed.
 * @param {String} dataType - Either 'Applications' or 'Instances'.
 * @returns {Array} - The transformed data based on the dataType.
 */

 const transformData = (jsonData, dataType) => {

    if (dataType === 'Instances') {
        const transformedInstances = [];
        jsonData.Instances.forEach(instance => {
            transformedInstances.push({
                ClusterId: jsonData.ClusterId,
                ClusterName: jsonData.ClusterName,
                InstanceType: instance.InstanceType,
                TotalPricePerUnit: instance.TotalPricePerUnit,
                EC2PricePerUnit: instance.EC2PricePerUnit,
                EMRPricePerUnit: instance.EMRPricePerUnit,
                Ec2InstanceId: instance.Ec2InstanceId,
                State: instance.State,
                Market: instance.Market,
                MemoryHours: instance.MemoryHours,
                VCPUHours: instance.VCPUHours,
                CostPerGBHour: instance.CostPerGBHour,
                CostPerVCoreHour: instance.CostPerVCoreHour,
                TotalAccumulatedCost: instance.TotalAccumulatedCost
            });
        });
        return transformedInstances;

    } else if (dataType === 'Applications') {
        const transformedApplications = [];
        jsonData.Applications.forEach(application => {
            transformedApplications.push({
                ClusterId: jsonData.ClusterId,
                ApplicationId: application.ApplicationId,
                ApplicationName: application.ApplicationName,
                State: application.State,
                FinalStatus: application.FinalStatus,
                ElapsedTime: application.ElapsedTime,
                MemorySeconds: application.MemorySeconds,
                VcoreSeconds: application.VcoreSeconds,
                AttributedCost: application.AttributedCost
            });
        });
        return transformedApplications;

    } else {
        throw new Error("Unsupported data type");
    }
};

export default transformData;