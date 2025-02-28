package com.network.controller;

import com.network.model.NetworkDevice;
import com.network.model.NetworkConfiguration;
import com.network.service.NetworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/network")
@RequiredArgsConstructor
public class NetworkController {
    private final NetworkService networkService;

    @GetMapping("/devices")
    public ResponseEntity<?> getAllDevices() {
        return ResponseEntity.ok(networkService.getAllDevices());
    }

    @GetMapping("/devices/{id}")
    public ResponseEntity<?> getDevice(@PathVariable Long id) {
        return ResponseEntity.ok(networkService.getDeviceById(id));
    }

    @PostMapping("/scan")
    public ResponseEntity<?> scanNetwork() {
        networkService.scanNetwork();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/devices/{id}/configure")
    public ResponseEntity<?> configureDevice(
            @PathVariable Long id,
            @RequestBody NetworkConfiguration config) {
        boolean success = networkService.configureDevice(id, config);
        return success ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
} 