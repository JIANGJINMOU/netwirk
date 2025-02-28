import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message } from 'antd';
import { networkApi } from '../api/networkApi';
import { NetworkDevice } from '../types/NetworkDevice';
import ConfigureDeviceModal from './ConfigureDeviceModal';

const DeviceList: React.FC = () => {
    const [devices, setDevices] = useState<NetworkDevice[]>([]);
    const [loading, setLoading] = useState(false);
    const [configureModalVisible, setConfigureModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);

    const fetchDevices = async () => {
        setLoading(true);
        try {
            const response = await networkApi.getAllDevices();
            setDevices(response.data);
        } catch (error) {
            message.error('Failed to fetch devices');
        } finally {
            setLoading(false);
        }
    };

    const handleScanNetwork = async () => {
        try {
            await networkApi.scanNetwork();
            message.success('Network scan initiated');
            fetchDevices();
        } catch (error) {
            message.error('Failed to scan network');
        }
    };

    const handleConfigure = (device: NetworkDevice) => {
        setSelectedDevice(device);
        setConfigureModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await networkApi.deleteDevice(id);
            message.success('Device deleted successfully');
            fetchDevices();
        } catch (error) {
            message.error('Failed to delete device');
        }
    };

    const handleConfigureSuccess = () => {
        fetchDevices();
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const columns = [
        {
            title: 'Device Name',
            dataIndex: 'deviceName',
            key: 'deviceName',
        },
        {
            title: 'IP Address',
            dataIndex: 'ipAddress',
            key: 'ipAddress',
        },
        {
            title: 'MAC Address',
            dataIndex: 'macAddress',
            key: 'macAddress',
        },
        {
            title: 'Status',
            dataIndex: 'isOnline',
            key: 'status',
            render: (online: boolean) => (
                <span style={{ color: online ? 'green' : 'red' }}>
                    {online ? 'Online' : 'Offline'}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: NetworkDevice) => (
                <Space>
                    <Button onClick={() => handleConfigure(record)}>Configure</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="device-list">
            <div className="actions">
                <Button type="primary" onClick={handleScanNetwork}>
                    Scan Network
                </Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={devices}
                loading={loading}
                rowKey="id"
            />
            <ConfigureDeviceModal
                device={selectedDevice}
                visible={configureModalVisible}
                onClose={() => setConfigureModalVisible(false)}
                onSuccess={handleConfigureSuccess}
            />
        </div>
    );
};

export default DeviceList;
