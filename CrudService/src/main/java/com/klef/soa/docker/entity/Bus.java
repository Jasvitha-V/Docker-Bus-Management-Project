package com.klef.soa.docker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "buses")
public class Bus {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String busNumber;
    private String operatorName;
    private Integer seatingCapacity;
    private Boolean acAvailable;

    public Bus() {
    }

    public Bus(Long id, String busNumber, String operatorName,
               Integer seatingCapacity, Boolean acAvailable) {
        this.id = id;
        this.busNumber = busNumber;
        this.operatorName = operatorName;
        this.seatingCapacity = seatingCapacity;
        this.acAvailable = acAvailable;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public Integer getSeatingCapacity() {
        return seatingCapacity;
    }

    public void setSeatingCapacity(Integer seatingCapacity) {
        this.seatingCapacity = seatingCapacity;
    }

    public Boolean getAcAvailable() {
        return acAvailable;
    }

    public void setAcAvailable(Boolean acAvailable) {
        this.acAvailable = acAvailable;
    }
    @Override
    public String toString() {
        return "Bus [id=" + id+ ", busNumber=" + busNumber+ ", operatorName=" + operatorName+ 
        		", "+ "seatingCapacity=" + seatingCapacity+ ", acAvailable=" + acAvailable + "]";
    }

}