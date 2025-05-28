import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
    DialogTitle,
    TextField,
    FormControl,
    Button,
    CircularProgress,
    DialogActions,
} from "@mui/material";
import { SnackbarContext } from './../../../contexts/SnackbarContext';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel'

import { EditAddInterFace } from './../../../interfaces/EditAdd';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { editAddInterFace } from "../../../interfaces/EditAddInterFace";
import { privateApiInstance } from "../../../services/api/apiInstance";
import { Ads_endpoints } from "../../../services/api/apiConfig";



export default function EditAds({ open,
    onClose,
    activeAndId,
    reRender,

}: EditAddInterFace) {


    let showSnackbar = useContext(SnackbarContext)
    const [myLoader, setMyLoader] = useState(false)
    const [value, setValue] = React.useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {



        setValue((event.target as HTMLInputElement).value);
    };


    const { formState: { errors, isSubmitting }, register, handleSubmit, reset } = useForm({ mode: "all" })


    useEffect(() => {
        if (open) {
            reset({ discount: "", });
            setValue("")
        }
    }, [open, reset]);

    function submitForm(data: editAddInterFace) {
        setMyLoader(true)
        console.log(data)
        privateApiInstance.put(Ads_endpoints.EditOnAdd(activeAndId.id), data).then((res) => {
            console.log(res.data.message)
            showSnackbar(`${res.data.message}`, "success");
            onClose()
            reRender()

        }).catch((err) => {
            console.log(err)

        }).finally(() => {
            setMyLoader(false)

        })
    }


    return (
        <Dialog
            onClose={onClose}

            open={open}
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "10px",
                    backgroundColor: "white",
                    color: "white"

                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Poppins",
                }}
            >
                <Typography fontWeight="bold" color="black">
                    Edit Facility
                </Typography>
                <IconButton onClick={onClose}>
                    <CancelOutlinedIcon color="error" />
                </IconButton>
            </DialogTitle>




            <DialogContent>

                <Box padding={"10px"} component={"div"}>

                    <Box component={"form"} onSubmit={handleSubmit(submitForm)} >

                        <FormControl fullWidth variant="filled">
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
                                helperText={errors.discount?.message}
                            />
                        </FormControl>
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
                                onChange={handleChange}
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
                        <Box component={"div"} sx={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "30px"
                        }}>



                            <DialogActions >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={myLoader}
                                    startIcon={myLoader ? <CircularProgress size={18} color="inherit" />
                                        : ""}

                                >
                                    Save
                                </Button>
                            </DialogActions>

                        </Box>
                    </Box>

                </Box>



            </DialogContent>

        </Dialog>)
}
