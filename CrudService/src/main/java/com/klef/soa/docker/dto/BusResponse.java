package com.klef.soa.docker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BusResponse {

    private Long id;
    private String busNumber;
    private String operatorName;
    private Integer seatingCapacity;
    private Boolean acAvailable;
}
