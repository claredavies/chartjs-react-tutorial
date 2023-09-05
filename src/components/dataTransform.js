// dataTransform.js

/**
 * Transforms the given data into the desired format.
 * @param {Object} jsonData - The data to be transformed.
 * @param {String} dataType - Either 'Applications' or 'Instances'.
 * @returns {Array} - The transformed data based on the dataType.
 */
const transformData = (jsonData, dataType) => {

    if (dataType === 'Instances') {
            console.log("here2")

        const transformedInstances = [];
        jsonData.Instances.forEach(instance => {
            transformedInstances.push({
                ClusterId: jsonData.ClusterId,
                ClusterName: jsonData.ClusterName,
                ServiceType: instance.InstanceType,
                PricePerUnit: instance.TotalPricePerUnit,
                EC2PricePerUnit: instance.EC2PricePerUnit,
                EMRPricePerUnit: instance.EMRPricePerUnit,
            });
        });
        return transformedInstances;

    } else if (dataType === 'Applications') {
        console.log("here")
        const transformedApplications = [];
        jsonData.Applications.forEach(application => {
            transformedApplications.push({
                ClusterId: jsonData.ClusterId,
                ApplicationId: application.ApplicationId,
                ApplicationName: application.ApplicationName,
                State: application.State,
                FinalStatus: application.FinalStatus,
                ElapsedTime: application.ElapsedTime,
                AttributedCost: application.AttributedCost
            });
        });
        return transformedApplications;

    } else {
        throw new Error("Unsupported data type");
    }
};

export default transformData;