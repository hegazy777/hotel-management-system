import {
    Dialog,
    DialogContent,

    Box,
    Grid,
    Typography,
} from "@mui/material";

import { DetailsInterFace } from "../../../interfaces/ViewDetails";
import CircularProgres from '@mui/material/CircularProgress';

export default function ViewDetails({

    open,
    onClose,
    AddDetails,
    loaderState

}: DetailsInterFace) {




    return (

        <>


            <Dialog
                onClose={onClose}

                open={open}
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: "10px",
                        backgroundColor: " rgba(32, 63, 196, 0.9)",
                        color: "white"

                    },
                }}
            >

                <DialogContent>

                    {loaderState ? <Box padding={"10px"} component={"div"}>
                        <Grid container spacing={3} alignItems={"center"}>
                            <Grid size={7}>
                                <img style={{ width: "100%", borderRadius: "5px" }} src={AddDetails?.room?.images[0]} alt="" />

                            </Grid>
                            <Grid size={5}>
                                <Typography component={"h3"}> Active ? : {AddDetails?.isActive == true ? "Yes" : "No"}  </Typography>
                                <Typography component={"h3"}> Room Name : {AddDetails?.room?.roomNumber}  </Typography>
                                <Typography component={"h3"}> Room Dicoount : {`${AddDetails?.room?.discount}%`}  </Typography>
                                <Typography component={"h3"}> Room Price : {`${AddDetails?.room?.price}`}  </Typography>
                                <Typography component={"h3"}> Room Capacity : {`${AddDetails?.room?.capacity}`}  </Typography>

                            </Grid>

                        </Grid>


                    </Box> : <Box component={"div"} style={{ paddingInline: "10.5rem", paddingBlock: "5.5rem" }}>    <CircularProgres color="inherit" /> </Box>}




                </DialogContent>

            </Dialog>
        </>



    )
}
