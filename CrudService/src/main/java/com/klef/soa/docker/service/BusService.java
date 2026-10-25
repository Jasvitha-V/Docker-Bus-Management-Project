package com.klef.soa.docker.service;

import java.util.List;
import com.klef.soa.docker.dto.BusRequest;
import com.klef.soa.docker.dto.BusResponse;

public interface BusService {

    BusResponse addBus(BusRequest request);

    List<BusResponse> getAllBuses();

    BusResponse getBusById(Long id);

    BusResponse updateBus(Long id, BusRequest request);

    void deleteBus(Long id);
}