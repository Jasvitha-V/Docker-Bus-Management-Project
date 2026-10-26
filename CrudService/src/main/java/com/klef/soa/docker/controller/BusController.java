package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.docker.dto.BusRequest;
import com.klef.soa.docker.dto.BusResponse;
import com.klef.soa.docker.service.BusService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BusController {

    @Autowired
    private BusService busService;

    @GetMapping("/")
    public String home() {
        return "SOA Docker Full Stack Deployment";
    }

    @PostMapping("/Add")
    public BusResponse addBus(@Valid @RequestBody BusRequest request) {
        return busService.addBus(request);
    }

    @GetMapping("/DisplayAll")
    public List<BusResponse> displayAllBuses() {
        return busService.getAllBuses();
    }

    @GetMapping("/Display/{id}")
    public BusResponse displayBusById(@PathVariable Long id) {
        return busService.getBusById(id);
    }

    @PutMapping("/Update/{id}")
    public BusResponse updateBus(
            @PathVariable Long id,
            @Valid @RequestBody BusRequest request) {
        return busService.updateBus(id, request);
    }

    @DeleteMapping("/Delete/{id}")
    public String deleteBus(@PathVariable Long id) {
        busService.deleteBus(id);
        return "Bus deleted successfully";
    }
}
