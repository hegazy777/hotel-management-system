import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  InputLabel,
  Select,
  FormControl
} from '@mui/material';
import axios from 'axios';

const baseUrlDev = 'https://upskilling-egypt.com:3000'; 

export default function RoomData() {
  const { handleSubmit, control, register } = useForm();
  const [facilities, setFacilities] = useState([]);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  const token = localStorage.getItem("token");


  const fetchFacilities = async () => {
    try {
      const res = await axios.get(`${baseUrlDev}/api/v0/admin/room-facilities`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFacilities(res.data.data.facilities);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };
  useEffect(() => {
   
    fetchFacilities();
  }, []);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setImages(prev => [...prev, ...files]);
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    for (let img of images) {
      formData.append('images', img);
    }
    for (let key in data) {
      formData.append(key, data[key]);
    }

    try {
      await axios.post(`${baseUrlDev}/api/v0/admin/rooms`, formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Room added successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed!');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(prev => [...prev, ...Array.from(files)]);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <TextField fullWidth label="Room Number" {...register("roomNumber")} margin="normal" />
      
      <Box display="flex" gap={2}>
        <TextField fullWidth label="Price" {...register("price")} margin="normal" />
        <TextField fullWidth label="Capacity" {...register("capacity")} margin="normal" />
      </Box>

      <Box display="flex" gap={2}>
        <TextField fullWidth label="Discount" {...register("discount")} margin="normal" />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Facilities</InputLabel>
          <Controller
            control={control}
            multiple
            name="facilities"
            render={({ field }) => (
              <Select {...field} label="Facilities">
                {facilities.map((fac: any) => (
                  <MenuItem key={fac.id} value={fac.id}>{fac.name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Box>

      <Box
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        sx={{
          mt: 3,
          p: 4,
          border: '2px dashed green',
          borderRadius: 2,
          textAlign: 'center',
          bgcolor: '#f4fff4',
          cursor: 'pointer'
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <Typography>
          Drag & Drop or <span style={{ color: 'green', textDecoration: 'underline' }}>Choose a Room Images</span> to Upload
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
        Submit
      </Button>
    </Box>
  );
}
