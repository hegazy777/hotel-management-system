import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  InputLabel,
  Select,
  FormControl,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { privateApiInstance } from "../../services/api/apiInstance";
import { room_endpoints } from "../../services/api/apiConfig";

const baseUrlDev = "https://upskilling-egypt.com:3000";

interface Facility {
  _id: string;
  name: string;
}
export default function RoomData() {
  const { handleSubmit, register,setValue } = useForm();
  const showSnackbar = useContext(SnackbarContext);

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [facilities, setFacilities] = useState([]);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [roomData, setRoomData] = useState<any>(null);

  const location = useLocation();
  const roomId = location.state?.roomId;


  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomId) {
        try {
          const response = await privateApiInstance.get(room_endpoints.GET_ROOM_BY_ID(roomId));
    
          setRoomData(response.data.data.room);
          console.log("sasa", response);
  
         
          setValue("roomNumber", response.data.data.room.roomNumber);
          setValue("price", response.data.data.room.price);
          setValue("capacity", response.data.data.room.capacity);
          setValue("discount", response.data.data.room.discount);
          
      
          
          setSelectedFacilities(response.data.data.room.facilities.map((facility: Facility) => facility._id));
        } catch (err) {
          console.error("Error fetching room data:", err);
        }
      }
    };
  
    fetchRoomData();
  }, [roomId]);
  

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchFacilities = async () => {
    try {
      const res = await axios.get(
        `${baseUrlDev}/api/v0/admin/room-facilities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFacilities(res.data.data.facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };


  useEffect(() => {
    fetchFacilities();
  }, []);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
  
    for (const img of images) {
      formData.append("imgs", img);
    }
  
    for (const facility of selectedFacilities) {
      formData.append("facilities", facility);
    }
  
    for (const key in data) {
      formData.append(key, data[key]);
    }
  
    try {
      if (roomId) {
      
        await  privateApiInstance.put(room_endpoints.UPDATE_ROOM(roomId), formData);
        showSnackbar("Room updated successfully");
      } else {
    
        await privateApiInstance.post(room_endpoints.CREATE_ROOM, formData) ;
        showSnackbar("Room added successfully");
      }
  
      navigate("/dashboard/rooms");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];

    const uniqueArray: string[] = Array.from(
      new Set([...selectedFacilities, ...value])
    );

    setSelectedFacilities(uniqueArray);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <TextField
        fullWidth
         defaultValue=" "
        label="Room Number"
        {...register("roomNumber")}
        margin="normal"
      />

      <Box display="flex" gap={2}>
        <TextField
          fullWidth
           defaultValue=" "
          label="Price"
          {...register("price")}
          margin="normal"
        />
        <TextField
          fullWidth
          defaultValue=" "
          label="Capacity"
          {...register("capacity")}
          margin="normal"
        />
      </Box>

      <Box display="flex" gap={2}>
        <TextField
          fullWidth
           defaultValue=" "
          label="Discount"
          {...register("discount")}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Facilities</InputLabel>
          <Select
            multiple
            value={selectedFacilities}
            onChange={handleChange}
            input={<OutlinedInput label="Facility" />}
          >
            {facilities?.map((facility: Facility) => (
              <MenuItem key={facility._id} value={facility._id}>
                {facility.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        sx={{
          mt: 3,
          p: 4,
          border: "2px dashed green",
          borderRadius: 2,
          textAlign: "center",
          bgcolor: "#f4fff4",
          cursor: "pointer",
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <Typography>
          Drag & Drop or{" "}
          <span style={{ color: "green", textDecoration: "underline" }}>
            Choose a Room Images
          </span>{" "}
          to Upload
        </Typography>
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
      </Box>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>
  {roomId ? "edit Room" : "Add Room"}
</Button>
    </Box>
  );
}
