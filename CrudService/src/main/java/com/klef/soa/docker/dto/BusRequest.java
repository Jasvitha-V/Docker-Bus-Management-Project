package com.klef.soa.docker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BusRequest {

    @NotBlank(message = "Bus number is required")
    @Size(max = 20, message = "Bus number cannot exceed 20 characters")
    private String busNumber;

    @NotBlank(message = "Operator name is required")
    private String operatorName;

    @NotNull(message = "Seating capacity is required")
    @Positive(message = "Seating capacity must be positive")
    private Integer seatingCapacity;

    @NotNull(message = "AC availability is required")
    private Boolean acAvailable;
}
