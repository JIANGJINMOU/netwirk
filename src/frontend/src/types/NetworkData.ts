export interface NetworkData {
    topology: any; // 根据实际需求定义具体类型
    metrics: any; // 根据实际需求定义具体类型
    alerts: any[]; // 根据实际需求定义具体类型
    refresh: () => Promise<void>;
} 