export interface Facility {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface FacilityDataProps {
  selectedId?: string;
  name?: string;
  getAllFacilities: () => void;
}

export interface FacilityDataForm {
  name: string;
}
