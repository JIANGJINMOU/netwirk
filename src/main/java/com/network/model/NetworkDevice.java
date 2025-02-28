package com.network.model;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class NetworkDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String macAddress;
    private String ipAddress;
    private String deviceName;
    private String deviceType;
    private boolean isOnline;
    
    @OneToOne(cascade = CascadeType.ALL)
    private NetworkMetrics metrics;
} 