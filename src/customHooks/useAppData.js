// useAppData.js
import { useState, useEffect } from 'react';
import transformData from '../components/dataTransform';

export const useAppData = () => {
    const [jsonData, setJsonData] = useState(null);
    const [selectedDataType, setSelectedDataType] = useState('Instances');
    const [transformedInstanceData, setTransformedInstanceData] = useState([]);

    useEffect(() => {
            console.log("called with intial render")
            fetchData();
        }, []); //will be called once after the initial render of the component

    //call the API and updates jsonData with setJsonData (trigger useEffects watching jsonData
    const fetchData = () => {
        fetch('https://de052dcf-5eac-40c3-8e08-d6a4db7c34dc.mock.pstmn.io/testDynamic')
            .then(response => response.json())
            .then(data => setJsonData(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        if (jsonData) {
            const newData = transformData(jsonData, selectedDataType);
            setTransformedInstanceData(newData);
        }
    }, [selectedDataType, jsonData]); // will be called if change in selectedDataType, jsonData

    return {
        jsonData, setJsonData,
        selectedDataType, setSelectedDataType,
        transformedInstanceData, setTransformedInstanceData,
        fetchData,
        transformData
    };
};