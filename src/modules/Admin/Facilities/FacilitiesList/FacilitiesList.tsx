import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { facilities_endpoints } from "../../../../services/api/apiConfig";
import { useContext, useEffect, useState } from "react";
import DropdownMenu from "../../../Shared/DropdownMenu/DropdownMenu";
import Header from "../../../Shared/Header/Header";
import FacilityData from "../FacilityData/FacilityData";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import { SnackbarContext } from "../../../../contexts/SnackbarContext";
import { AxiosError } from "axios";
import { Facility } from "../../../../interfaces/Facility";

export default function Facilities() {
  const showSnackbar = useContext(SnackbarContext);

  const [facilitiesList, setFacilitiesList] = useState<Facility[]>([]);
  const getAllFacilities = async () => {
    const response = await privateApiInstance(
      facilities_endpoints.GET_ALL_FACILITIES
    );

    setFacilitiesList(response?.data?.data?.facilities);
  };

  useEffect(() => {
    getAllFacilities();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleShow = (id: string) => {
    setShowModal(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const handleCloseAndDelete = (id: string | null) => {
    handleClose();
    if (id) deleteFacility(id);
  };

  const deleteFacility = async (selectedId: string) => {
    try {
      await privateApiInstance.delete(
        facilities_endpoints.DELETE_FACILITY(selectedId)
      );
      showSnackbar("Facility deleted successfully", "success");
      getAllFacilities();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      showSnackbar(
        axiosError?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <>
      <Header headerTitle="Facilities">
        <FacilityData getAllFacilities={getAllFacilities} />
      </Header>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow
              sx={{
                "& > :first-of-type": {
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                },
                "& > :last-child": {
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                },
                backgroundColor: "#E2E5EB",
              }}
            >
              <TableCell sx={{ border: "none" }}>
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{ border: "none" }}>
                <strong>Created At</strong>
              </TableCell>
              <TableCell sx={{ border: "none" }}>
                <strong>Updated At</strong>
              </TableCell>
              <TableCell sx={{ border: "none" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilitiesList &&
              facilitiesList.map((facility, index) => (
                <TableRow
                  key={facility._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9",
                  }}
                >
                  <TableCell sx={{ border: "none" }}>{facility.name}</TableCell>
                  <TableCell sx={{ border: "none" }}>
                    {new Date(facility.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    {new Date(facility.updatedAt).toLocaleString()}
                  </TableCell>

                  <TableCell sx={{ border: "none" }}>
                    <DropdownMenu
                      onView={() => console.log("View")}
                      EditButton={
                        <FacilityData
                          selectedId={facility._id}
                          name={facility.name}
                          getAllFacilities={getAllFacilities}
                        />
                      }
                      onDelete={() => handleShow(facility._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteConfirmation
        itemName="Facility"
        open={showModal}
        onClose={handleClose}
        onConfirm={() => handleCloseAndDelete(selectedId)}
      />
    </>
  );
}
