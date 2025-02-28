package com.network.service.impl;

import com.network.model.NetworkDevice;
import com.network.model.NetworkConfiguration;
import com.network.repository.NetworkDeviceRepository;
import com.network.service.NetworkService;
import com.network.core.NetworkManager;
import com.network.exception.DeviceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NetworkServiceImpl implements NetworkService {
    private final NetworkDeviceRepository deviceRepository;
    private final NetworkManager networkManager;

    @Override
    public List<NetworkDevice> getAllDevices() {
        return deviceRepository.findAll();
    }

    @Override
    public NetworkDevice getDeviceById(Long id) {
        return deviceRepository.findById(id)
            .orElseThrow(() -> new DeviceNotFoundException("Device not found: " + id));
    }

    @Override
    public NetworkDevice updateDevice(NetworkDevice device) {
        return deviceRepository.save(device);
    }

    @Override
    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

    @Override
    @Scheduled(fixedDelayString = "${network.scan-interval}")
    public void scanNetwork() {
        log.info("Starting network scan...");
        List<NetworkDevice> devices = networkManager.getNetworkDiscovery().discoverDevices();
        devices.forEach(this::updateDeviceStatus);
    }

    @Override
    public boolean configureDevice(Long id, NetworkConfiguration config) {
        NetworkDevice device = getDeviceById(id);
        return networkManager.getNetworkConfiguration()
            .assignIPAddress(device.getDeviceName(), config.getIp(), config.getMask());
    }

    private void updateDeviceStatus(NetworkDevice device) {
        NetworkDevice existingDevice = deviceRepository.findByMacAddress(device.getMacAddress())
            .orElse(device);
        existingDevice.setOnline(true);
        existingDevice.setIpAddress(device.getIpAddress());
        deviceRepository.save(existingDevice);
    }
} 