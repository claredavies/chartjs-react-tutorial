import { useState, useEffect } from 'react';

export const useJsonDataState = () => useState(null);
export const useSelectedDataTypeState = () => useState('Instances');
export const useTransformedInstanceDataState = () => useState([]);