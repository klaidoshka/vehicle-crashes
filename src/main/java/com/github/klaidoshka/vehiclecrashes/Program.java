package com.github.klaidoshka.vehiclecrashes;

import com.github.klaidoshka.vehiclecrashes.api.service.IVehicleTypesFiller;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.lang.NonNull;

@SpringBootApplication
public class Program {

  private final IVehicleTypesFiller vehicleTypesFiller;

  @Autowired
  public Program(@NonNull IVehicleTypesFiller vehicleTypesFiller) {
    this.vehicleTypesFiller = vehicleTypesFiller;
  }

  @PostConstruct
  public void init() {
    vehicleTypesFiller.fillMissing();
  }

  public static void main(String[] args) {
    SpringApplication.run(Program.class, args);
  }
}
