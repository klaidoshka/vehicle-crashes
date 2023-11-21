import { TableColumn } from 'react-data-table-component';

import { Gender } from '../../constants/Gender';
import { VehicleType } from '../../constants/VehicleType';
import CrashView from '../../dto/CrashView';
import PersonViewModifiable from '../../dto/PersonViewModifiable';
import VehicleOwnerViewModifiable from '../../dto/VehicleOwnerViewModifiable';
import VehicleViewModifiable from '../../dto/VehicleViewModifiable';

const columnsCrash: TableColumn<CrashView>[] = [
  {
    id: "id",
    name: "#",
    selector: (row) => row.id ?? "N/A",
    sortable: true,
    width: "80px"
  },
  {
    id: "damageCost",
    name: "Damage Cost",
    selector: (row) => row.damageCost!,
    sortable: true,
    width: "100px"
  },
  {
    id: "date",
    name: "Date",
    selector: (row) => row.date!,
    sortable: true,
    width: "150px"
  }
];

const columnsPerson: TableColumn<PersonViewModifiable>[] = [
  {
    id: "id",
    name: "#",
    selector: (row) => row.id!,
    sortable: true,
    width: "80px"
  },
  {
    id: "name",
    name: "Name",
    selector: (row) => row.name!,
    sortable: true,
    width: "160px"
  },
  {
    id: "dateBirth",
    name: "Date Birth",
    selector: (row) => row.dateBirth!,
    sortable: true,
    width: "150px"
  },
  {
    id: "gender",
    name: "Gender",
    selector: (row) => row.gender!,
    sortable: true,
    width: "150px",
    format: (row) => (isNaN(row.gender!) ? row.gender : Gender[row.gender!])
  }
];

const columnsVehicle: TableColumn<VehicleViewModifiable>[] = [
  {
    id: "id",
    name: "#",
    selector: (row) => row.id!,
    sortable: true,
    width: "80px"
  },
  {
    id: "type",
    format: (row) => (isNaN(row.type!) ? row.type : VehicleType[row.type!]),
    name: "Type",
    selector: (row) => row.type!,
    sortable: true,
    width: "150px"
  },
  {
    id: "color",
    name: "Color",
    selector: (row) => row.color!,
    sortable: true,
    width: "100px"
  },
  {
    id: "plate",
    name: "Plate",
    selector: (row) => row.plate!,
    sortable: true,
    width: "150px"
  },
  {
    id: "dateManufacture",
    format: (row) => {
      return new Date(row.dateManufacture).toISOString().split("T")[0];
    },
    name: "Date Manufacture",
    selector: (row) => row.dateManufacture!,
    sortable: true,
    width: "150px"
  }
];

const columnsVehicleOwnerVehicleSided: TableColumn<VehicleOwnerViewModifiable>[] = [
  {
    id: "plate",
    name: "Plate",
    selector: (row) => row.vehicle.plate!,
    sortable: true,
    width: "150px"
  },
  {
    id: "type",
    format: (row) => (isNaN(row.vehicle.type!) ? row.vehicle.type : VehicleType[row.vehicle.type!]),
    name: "Type",
    selector: (row) => row.vehicle.type!,
    sortable: true,
    width: "150px"
  },
  {
    id: "vehicle.dateManufacture",
    name: "Manufactured At",
    selector: (row) => row.vehicle.dateManufacture!,
    sortable: true,
    width: "150px"
  },
  {
    id: "dateAcquisition",
    name: "Vehicle Acquired",
    selector: (row) => row.dateAcquisition!,
    sortable: true,
    width: "150px"
  },
  {
    id: "dateDisposal",
    name: "Vehicle Disposed",
    selector: (row) => row.dateDisposal!,
    sortable: true,
    width: "150px"
  }
];

const columnsVehicleOwnerPersonSided: TableColumn<VehicleOwnerViewModifiable>[] = [
  {
    id: "name",
    name: "Name",
    selector: (row) => row.person.name!,
    sortable: true,
    width: "160px"
  },
  {
    id: "dateBirth",
    name: "Date Birth",
    selector: (row) => row.person.dateBirth!,
    sortable: true,
    width: "150px"
  },
  {
    id: "dateAcquisition",
    name: "Vehicle Acquired",
    selector: (row) => row.dateAcquisition!,
    sortable: true,
    width: "150px"
  },
  {
    id: "dateDisposal",
    name: "Vehicle Disposed",
    selector: (row) => row.dateDisposal!,
    sortable: true,
    width: "150px"
  }
];

export const CrashColumns = columnsCrash;
export const PersonColumns = columnsPerson;
export const VehicleColumns = columnsVehicle;
export const VehicleOwnerColumnsPersonSided = columnsVehicleOwnerPersonSided;
export const VehicleOwnerColumnsVehicleSided = columnsVehicleOwnerVehicleSided;
