import React, { useEffect, useState } from 'react';
import { Layout, Card, Alert, Row, Col, Statistic } from 'antd';
import { NetworkTopology } from './NetworkTopology';
import { PerformanceChart } from './PerformanceChart';
import { AlertPanel } from './AlertPanel';
import { networkApi } from '../api/networkApi';
import { NetworkDevice } from '../types/NetworkDevice';
import type { NetworkData } from '../types/NetworkData';

interface DashboardProps {
    networkData?: NetworkData;
}

const Dashboard: React.FC<DashboardProps> = ({ networkData }) => {
    const [refreshInterval] = useState<number>(5000);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [devices, setDevices] = useState<NetworkDevice[]>([]);

    useEffect(() => {
        const fetchDevices = async () => {
            setIsLoading(true);
            try {
                const response = await networkApi.getAllDevices();
                setDevices(response.data);
            } catch (error) {
                console.error('Failed to fetch devices:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchData = async () => {
            if (networkData) {
                setIsLoading(true);
                try {
                    await networkData.refresh();
                } catch (error) {
                    console.error('Failed to fetch network data:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchDevices();
        const devicesInterval = setInterval(fetchDevices, 30000);

        if (networkData) {
            fetchData();
            const dataInterval = setInterval(fetchData, refreshInterval);
            return () => {
                clearInterval(devicesInterval);
                clearInterval(dataInterval);
            };
        }

        return () => clearInterval(devicesInterval);
    }, [refreshInterval, networkData]);

    const onlineDevices = devices.filter(device => device.isOnline);

    return (
        <Layout className="dashboard">
            <Layout.Content>
                <Card title="网络拓扑" loading={isLoading}>
                    <NetworkTopology data={networkData?.topology} />
                </Card>
                
                <Card title="性能监控" loading={isLoading}>
                    <PerformanceChart 
                        metrics={networkData?.metrics}
                        timeRange="1h"
                    />
                </Card>

                <Card title="告警信息">
                    <AlertPanel 
                        warnings={networkData?.alerts}
                        onAcknowledge={handleAlertAcknowledge}
                    />
                </Card>

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card loading={isLoading}>
                            <Statistic
                                title="Total Devices"
                                value={devices.length}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card loading={isLoading}>
                            <Statistic
                                title="Online Devices"
                                value={onlineDevices.length}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card loading={isLoading}>
                            <Statistic
                                title="Offline Devices"
                                value={devices.length - onlineDevices.length}
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default Dashboard; 