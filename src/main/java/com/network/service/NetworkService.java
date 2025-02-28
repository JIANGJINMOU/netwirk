package com.network.service;

import com.network.model.NetworkDevice;
import com.network.model.NetworkConfiguration;
import java.util.List;

public interface NetworkService {
    List<NetworkDevice> getAllDevices();
    NetworkDevice getDeviceById(Long id);
    NetworkDevice updateDevice(NetworkDevice device);
    void deleteDevice(Long id);
    void scanNetwork();
    boolean configureDevice(Long id, NetworkConfiguration config);
} 