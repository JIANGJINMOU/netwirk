package com.network.repository;

import com.network.model.NetworkMetrics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NetworkMetricsRepository extends JpaRepository<NetworkMetrics, Long> {
} 