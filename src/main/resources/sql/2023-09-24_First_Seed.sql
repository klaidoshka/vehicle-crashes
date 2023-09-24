-- Thu Sep 24 15:25:49 2023

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Insurance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Insurance` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `InitializationDate` DATETIME NULL,
  `ExpirationDate` DATETIME NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`VehicleType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`VehicleType` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Vehicle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Vehicle` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ManufactureDate` DATE NULL,
  `Color` VARCHAR(255) NULL,
  `Plate` VARCHAR(255) NULL,
  `VehicleType_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Plate_UNIQUE` (`Plate` ASC) VISIBLE,
  INDEX `fk_Vehicle_VehicleType1_idx` (`VehicleType_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Vehicle_VehicleType1`
    FOREIGN KEY (`VehicleType_Id`)
    REFERENCES `mydb`.`VehicleType` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`InsuranceRegistrar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`InsuranceRegistrar` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Insurance_Id` INT NOT NULL,
  `Vehicle_Id` INT NOT NULL,
  PRIMARY KEY (`Id`, `Insurance_Id`),
  INDEX `fk_InsuranceRegistrar_Insurance_idx` (`Insurance_Id` ASC) VISIBLE,
  INDEX `fk_InsuranceRegistrar_Vehicle1_idx` (`Vehicle_Id` ASC) VISIBLE,
  CONSTRAINT `fk_InsuranceRegistrar_Insurance`
    FOREIGN KEY (`Insurance_Id`)
    REFERENCES `mydb`.`Insurance` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_InsuranceRegistrar_Vehicle1`
    FOREIGN KEY (`Vehicle_Id`)
    REFERENCES `mydb`.`Vehicle` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`VehicleCrash`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`VehicleCrash` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Crash Date` DATETIME NULL,
  `DamageCost` DECIMAL(10) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Person` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NULL,
  `BirthDate` DATETIME NULL,
  `Gender` VARCHAR(6) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`VehicleRegistrar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`VehicleRegistrar` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Vehicle_Id` INT NOT NULL,
  `Person_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_VehicleRegistrar_Vehicle1_idx` (`Vehicle_Id` ASC) VISIBLE,
  INDEX `fk_VehicleRegistrar_Person1_idx` (`Person_Id` ASC) VISIBLE,
  CONSTRAINT `fk_VehicleRegistrar_Vehicle1`
    FOREIGN KEY (`Vehicle_Id`)
    REFERENCES `mydb`.`Vehicle` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_VehicleRegistrar_Person1`
    FOREIGN KEY (`Person_Id`)
    REFERENCES `mydb`.`Person` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`VehicleCrashRegistrar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`VehicleCrashRegistrar` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `VehicleCrash_Id` INT NOT NULL,
  `VehicleRegistrar_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_VehicleCrashRegistrar_VehicleCrash1_idx` (`VehicleCrash_Id` ASC) VISIBLE,
  INDEX `fk_VehicleCrashRegistrar_VehicleRegistrar1_idx` (`VehicleRegistrar_Id` ASC) VISIBLE,
  CONSTRAINT `fk_VehicleCrashRegistrar_VehicleCrash1`
    FOREIGN KEY (`VehicleCrash_Id`)
    REFERENCES `mydb`.`VehicleCrash` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_VehicleCrashRegistrar_VehicleRegistrar1`
    FOREIGN KEY (`VehicleRegistrar_Id`)
    REFERENCES `mydb`.`VehicleRegistrar` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
