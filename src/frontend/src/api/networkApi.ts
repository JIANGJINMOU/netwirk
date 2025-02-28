import axios from 'axios';
import { NetworkDevice } from '../types/NetworkDevice';
import { NetworkConfiguration } from '../types/NetworkConfiguration';

const API_BASE_URL = '/api/network';

export const networkApi = {
    getAllDevices: () => 
        axios.get<NetworkDevice[]>(`${API_BASE_URL}/devices`),
        
    getDevice: (id: number) => 
        axios.get<NetworkDevice>(`${API_BASE_URL}/devices/${id}`),
        
    scanNetwork: () => 
        axios.post(`${API_BASE_URL}/scan`),
        
    configureDevice: (id: number, config: NetworkConfiguration) =>
        axios.post(`${API_BASE_URL}/devices/${id}/configure`, config),
        
    deleteDevice: (id: number) =>
        axios.delete(`${API_BASE_URL}/devices/${id}`),
}; 