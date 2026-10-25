package com.klef.soa.docker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.BusRequest;
import com.klef.soa.docker.dto.BusResponse;
import com.klef.soa.docker.entity.Bus;
import com.klef.soa.docker.repository.BusRepository;

@Service
public class BusServiceImpl implements BusService {

    @Autowired
    private BusRepository busRepository;

    @Override
    public BusResponse addBus(BusRequest request) {
        Bus bus = new Bus();

        bus.setBusNumber(request.getBusNumber());
        bus.setOperatorName(request.getOperatorName());
        bus.setSeatingCapacity(request.getSeatingCapacity());
        bus.setAcAvailable(request.getAcAvailable());

        Bus savedBus = busRepository.save(bus);

        return convertToResponse(savedBus);
    }

    @Override
    public List<BusResponse> getAllBuses() {
        return busRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BusResponse getBusById(Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Bus not found with ID: " + id));

        return convertToResponse(bus);
    }

    @Override
    public BusResponse updateBus(Long id, BusRequest request) {
        Bus existingBus = busRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Bus not found with ID: " + id));

        existingBus.setBusNumber(request.getBusNumber());
        existingBus.setOperatorName(request.getOperatorName());
        existingBus.setSeatingCapacity(request.getSeatingCapacity());
        existingBus.setAcAvailable(request.getAcAvailable());

        Bus updatedBus = busRepository.save(existingBus);

        return convertToResponse(updatedBus);
    }

    @Override
    public void deleteBus(Long id) {
        if (!busRepository.existsById(id)) {
            throw new RuntimeException("Bus not found with ID: " + id);
        }

        busRepository.deleteById(id);
    }

    private BusResponse convertToResponse(Bus bus) {
        return BusResponse.builder()
                .id(bus.getId())
                .busNumber(bus.getBusNumber())
                .operatorName(bus.getOperatorName())
                .seatingCapacity(bus.getSeatingCapacity())
                .acAvailable(bus.getAcAvailable())
                .build();
    }
}
