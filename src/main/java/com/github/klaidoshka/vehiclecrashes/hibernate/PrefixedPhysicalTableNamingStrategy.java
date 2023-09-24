package com.github.klaidoshka.vehiclecrashes.hibernate;

import com.github.klaidoshka.vehiclecrashes.VehicleCrashesApplication;
import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.PhysicalNamingStrategy;
import org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;

public final class PrefixedPhysicalNamingStrategy implements PhysicalNamingStrategy {

  public static final String PREFIX =  "vc_";
  
  @Override
  public Identifier toPhysicalCatalogName(Identifier logicalName, JdbcEnvironment jdbcEnvironment) {
    return Identifier.toIdentifier(PREFIX + logicalName.getText());
  }

  @Override
  public Identifier toPhysicalSchemaName(Identifier logicalName, JdbcEnvironment jdbcEnvironment) {
    return PREFIX + logicalName;
  }

  @Override
  public Identifier toPhysicalTableName(Identifier logicalName, JdbcEnvironment jdbcEnvironment) {
    return PREFIX + logicalName;
  }

  @Override
  public Identifier toPhysicalSequenceName(Identifier logicalName,
      JdbcEnvironment jdbcEnvironment) {
    return PREFIX + logicalName;
  }

  @Override
  public Identifier toPhysicalColumnName(Identifier logicalName, JdbcEnvironment jdbcEnvironment) {
    return PREFIX + logicalName;
  }
}
