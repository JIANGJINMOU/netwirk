package com.network.repository;

import com.network.model.NetworkDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NetworkDeviceRepository extends JpaRepository<NetworkDevice, Long> {
    Optional<NetworkDevice> findByMacAddress(String macAddress);
} 