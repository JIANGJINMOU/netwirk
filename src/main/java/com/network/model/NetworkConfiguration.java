package com.network.model;

import lombok.Data;

@Data
public class NetworkConfiguration {
    private String ip;
    private String mask;
    private String gateway;
    private String[] dns;
} 