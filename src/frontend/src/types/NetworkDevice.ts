export interface NetworkDevice {
    id: number;
    macAddress: string;
    ipAddress: string;
    deviceName: string;
    deviceType: string;
    isOnline: boolean;
    metrics?: NetworkMetrics;
}

export interface NetworkMetrics {
    bandwidth: number;
    latency: number;
    packetLoss: number;
    timestamp: string;
}

export interface NetworkConfiguration {
    ip: string;
    mask: string;
    gateway?: string;
    dns?: string[];
} 