package com.network.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class NetworkMetrics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private double bandwidth;
    private double latency;
    private double packetLoss;
    private LocalDateTime timestamp;
    
    @OneToOne(mappedBy = "metrics")
    private NetworkDevice device;
} 