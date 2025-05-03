import React, { useContext, useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Typography,

    FormControl,
    Box,
    InputLabel,
    Select,
    MenuItem,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useForm } from 'react-hook-form';
import { SnackbarContext } from './../../../contexts/SnackbarContext';
import { addAdds, addAddsData } from './../../../interfaces/AddNewAdd';
import { SelectChangeEvent } from '@mui/material/Select';
import { privateApiInstance } from '../../../services/api/apiInstance';
import { Ads_endpoints } from '../../../services/api/apiConfig';


export default function AddNewAdd({ onOpen, onClos, roomData, fetchAds }: addAdds) {
    const showSnackbar = useContext(SnackbarContext);
    console.log(roomData)

    const [value, setValue] = React.useState("");

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const handleChangee = (event: React.ChangeEvent<HTMLInputElement>) => {



        setValue((event.target as HTMLInputElement).value);
    };




    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        if (onOpen) {
            reset({ discount: "", });
        }
    }, [onOpen, reset]);

    const handleClose = () => {
        onClos()
        reset();
    };

    const onSubmit = async (data: addAddsData) => {
        privateApiInstance.post(Ads_endpoints.addAdd, data).then((res) => {
            showSnackbar(res?.data.message, "success")

            onClos()
            fetchAds()


        }).catch((err) => {
            console.log(err?.response.data.message)
            showSnackbar(err?.response.data.message, "error")
        })

    };
    return (
        <Dialog open={onOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Poppins",
                }}
            >
                <Typography fontWeight="bold">
                    Ads                </Typography>
                <IconButton onClick={handleClose}>
                    <CancelOutlinedIcon color="error" />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} >
                <DialogContent>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl


                            fullWidth>
                            <InputLabel id="demo-simple-select-label"  >Room </InputLabel>
                            <Select


                                {...register("room", {
                                    required: "Please Enter Room Name"
                                })}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Room"
                                onChange={handleChange}

                                error={!!errors.room}


                            >

                                {roomData?.length == 0 ? <MenuItem style={{background:"red" ,display:"inline" ,color:"white"}}>  all the rooms in an ads </MenuItem> : <>
                                    {roomData?.map((data, i) => {
                                        let { roomNumber, _id } = data
                                        return <MenuItem key={i}



                                            value={_id}>{roomNumber}</MenuItem>
                                    })}</>}



                            </Select>
                        </FormControl>
                        {errors.room?.message && <Box component={"span"} sx={{ color: "red", fontSize: "10px", marginLeft: "10px " }} > {errors.room.message}</Box>}

                        <FormControl style={{ marginTop: "20px" }} fullWidth variant="filled">
                            <TextField
                                {...register("discount", {
                                    required: "please enter your price ",
                                    pattern: {
                                        value: /^\d{2,}$/,
                                        message: "Invalid input! Please enter a number with at least 2 digits (0-9).  "

                                    }
                                })}
                                label="Enter discount Price "
                                sx={{
                                    "& .MuiInputBase-input": {
                                        padding: "5px !important",
                                        paddingBottom: "20px !important"
                                    },


                                }}
                                error={!!errors.discount}
                            />
                        </FormControl>
                        {errors.discount?.message && <Box component={"span"} sx={{ color: "red", fontSize: "10px", marginLeft: "10px " }} > {errors?.discount.message}</Box>}

                        <Box component={"div"} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }} >                 <FormControl   >
                            <FormLabel error={!!errors.isActive}
                                id="demo-controlled-radio-buttons-group">Activity</FormLabel>
                            <RadioGroup
                                {...register("isActive", {
                                    required: "please chose Yes OR NO"
                                })}

                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChangee}
                            >
                                <FormControlLabel       {...register("isActive", {
                                    required: "please chose Yes OR NO"
                                })} sx={{ color: "black" }} value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel        {...register("isActive", {
                                    required: "please chose Yes OR NO"
                                })} value="false" sx={{ color: "black" }} control={<Radio />} label="No" />
                                {errors.isActive?.message && <Box component={"span"} sx={{ color: "red", fontSize: "10px" }} > {errors.isActive.message}</Box>}
                            </RadioGroup>
                        </FormControl></Box>

                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" />
                            : ""}

                    >
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>)
}
