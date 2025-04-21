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
import { useEffect, useState } from "react";
import DropdownMenu from "../../../Shared/DropdownMenu/DropdownMenu";
import Header from "../../../Shared/Header/Header";

interface Facility {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function Facilities() {
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

  return (
    <>
      <Header
        headerTitle="Facilities"
        buttonText="Facility"
        onAdd={() => console.log("Hello Add me")}
      />
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
                      onEdit={() => console.log("Edit")}
                      onDelete={() => console.log("Delete")}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
