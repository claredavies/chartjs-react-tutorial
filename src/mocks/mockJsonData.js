export const mockData = {
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