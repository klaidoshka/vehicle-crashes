enum VehicleType {
  CAR = 0,
  BUS = 1,
  VAN = 2,
  TRUCK = 3,
  MOTORCYCLE = 4,
  BICYCLE = 5,
  BOAT = 6,
  PLANE = 7
}

const values = Object
  .keys(VehicleType)
  .filter((key: string | number) => isNaN(key as number))
  .map((key: string | number) => key as number);

export {VehicleType, values};