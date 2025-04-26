import { NotificationsNone } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const Dashboard = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalFacilities, setTotalFacilities] = useState(160);

  const token = localStorage.getItem("token");

  const getRooms = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/rooms?page=1&size=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalRooms(response.data.data.totalCount);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const getFacilities= async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/room-facilities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fdfdsfsd",response);
      setTotalFacilities(response.data.data.totalCount);
    
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };


  useEffect(() => {
    getRooms();
    getFacilities();
  }, []);

  const pieData1 = [
    { name: "pending", value: 50, color: "#5F6DF8" },
    { name: "completed", value: 20, color: "#A269FF" },
  ];

  const pieData2 = [
    { name: "User", value: 25, color: "#58e94f" },
    { name: "Admin", value: 10, color: "#47CFFF" },
  ];

  return (
    <Box padding={2}>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        mb={4}
        justifyContent="flex-start"
      >
        <Box>
          <Card
            sx={{
              backgroundColor: "#1a1a1a",
              color: "white",
              width: "280px",
              height: "150px",
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {totalRooms}
              </Typography>
              <Typography variant="subtitle1" color="#B0B0B0">
                Rooms{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#1E2A78",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NotificationsNone sx={{ color: "#4E4B66" }} />
            </Box>
          </Card>
        </Box>
        <Box>
          <Card
            sx={{
              backgroundColor: "#1a1a1a",
              color: "white",
              width: "280px",
              height: "150px",
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {totalFacilities}
              </Typography>
              <Typography variant="subtitle1" color="#B0B0B0">
                Facilities
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#1E2A78",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NotificationsNone sx={{ color: "#4E4B66" }} />
            </Box>
          </Card>
        </Box>
        <Box>
          <Card
            sx={{
              backgroundColor: "#1a1a1a",
              color: "white",
              width: "280px",
              height: "150px",
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {totalRooms}
              </Typography>
              <Typography variant="subtitle1" color="#B0B0B0">
                Ads{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#1E2A78",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NotificationsNone sx={{ color: "#4E4B66" }} />
            </Box>
          </Card>
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={3}>
        <Card>
          <CardContent>
            <PieChart width={300} height={250}>
              <Pie
                data={pieData1}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
              >
                {pieData1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <PieChart width={250} height={250}>
              <Pie
                data={pieData2}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={60}
                label
              >
                {pieData2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
            <Typography align="center" variant="subtitle1">
              Users
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
