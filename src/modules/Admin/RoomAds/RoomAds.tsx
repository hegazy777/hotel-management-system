import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import Paper from '@mui/material/Paper';

import { Box, Button, TableCell, Typography } from '@mui/material';
import { privateApiInstance } from '../../../services/api/apiInstance';
import { Ads_endpoints } from '../../../services/api/apiConfig';
import { useContext, useEffect, useState } from 'react';
import DropdownForAds from '../../Shared/DropdownMenu/DropdownForAds';
import ViewDetails from '../../Shared/ViewDetails/ViewDetails';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import EditAds from '../../Shared/EditAds/EditAds';
import DeleteConfirmation from './../../Shared/DeleteConfirmation/DeleteConfirmation';
import AddNewAdd from './AddNewAdd';

export default function RoomAds() {
    let showSnackbar = useContext(SnackbarContext)
    const [getAdsData, setGetAdsData] = useState(null)
    const [getRoomId, setGetRoomId] = useState(null)
    const [getAdsDataDetails, setGetAdsDataDetails] = useState(null)
    useEffect(() => {
        getAllAds()

    }, [])

    const [showModal, setShowModal] = useState(false);
    const [showModalForEdit, setShowModalForEdit] = useState(false);
    const [compRise, setCompRise] = useState(false)
    const [activeId, setActiveId] = useState({})

    const [showModalForDelete, setShowModalForDelete] = useState(false);
    const [getDeleteId, setgetDeleteId] = useState("");
    const [openForAdd, setOpenForAdd] = useState(false);


    const handleClose = () => {
        setShowModal(false);
    };
    const handleCloseForEdit = () => {
        setShowModalForEdit(false);
    };


    function handleCloseForDelete() {
        setShowModalForDelete(false)
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(even)': {
            backgroundColor: "#f8f9fb",
        },
        // hide last border
        'td': {
            border: 0,
        },
        'th': {
            border: 0,
        },
    }));


    ///getRooms
    function getRoom() {
        privateApiInstance.get(Ads_endpoints.getRoomId).then((res) => {
            const roomsWithAdsIds = getAdsData?.map(ad => ad.room._id);
            console.log(roomsWithAdsIds)
            const roomWithoutAds = res?.data?.data.rooms?.filter(room => {
                return !roomsWithAdsIds.includes(room._id);
            });

            setGetRoomId(roomWithoutAds);
        }).catch((err) => {
            showSnackbar("Failed to fetch rooms", "error");
        });
    }
    function getAllAds(): void {
        privateApiInstance.get(Ads_endpoints.GET_ALL_Ads).then((res) => {
            setGetAdsData(res?.data.data.ads)
        }).catch((err) => {
            console.log(err.response.data.message)

        })
    }

    function viewRoom(id: string | number) {
        setCompRise(false)

        setShowModal(true);
        privateApiInstance.get(Ads_endpoints.GET_Add_details(id)).then((res) => {
            // console.log(res?.data?.data.ads)
            setGetAdsDataDetails(res?.data?.data.ads)


        }).catch((err) => {
            console.log(err)

        }).finally(() => {
            setCompRise(true)

        })



    }
    function editData(id: string, isActive: boolean): void {

        setShowModalForEdit(true);
        let data = {
            id: id,
            active: isActive
        }


        setActiveId(data)
    }

    function handelShowForDelete(id: string) {
        setShowModalForDelete(true)
        setgetDeleteId(id)

    }
    function handelClick() {
        getRoom()
        setOpenForAdd(true)
    }
    function deleteRoomAd(): void {
        privateApiInstance.delete(Ads_endpoints.deleteAdd(getDeleteId)).then((res) => {
            console.log(res.data.message)
            setShowModalForDelete(false)
            showSnackbar(res?.data?.message, "success")
            getAllAds()


        }).catch((err) => {
            console.log(err)

        })

    }






    return (
        <>


            <Box sx={

                {
                    flexDirection: { md: "row", sm: "column", xs: "column" },
                    alignItems: { sm: "start", xs: "start", md: "center" },
                    marginBlock: "10px"



                }} component={"div"} display={'flex'} justifyContent={"space-between"}    >
                <Box component={"div"} sx={{ marginBottom: { xs: "15px", sm: "0px" } }}>

                    <Typography component={"h1"} variant='h5'>ADS Table Details</Typography>
                    <Typography component={"h3"} variant='h6'>You can check all details</Typography>
                </Box>
                <Box component={"div"}> <Button variant="contained" onClick={handelClick} sx={{ backgroundColor: "#203fc7" }}>Add New Ads</Button>
                </Box>




            </Box >


            <Box component={"div"} position={"relative"} >


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "#e2e5eb" }}>
                            <TableRow>
                                <TableCell>room Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Discount</TableCell>
                                <TableCell align="right">Capacity</TableCell>
                                <TableCell align="right">Active</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {getAdsData?.map((data: any) => {
                                let { _id,
                                    isActive,
                                    room
                                } = data
                                let { capacity, price, roomNumber, discount } = room
                                return <StyledTableRow key={_id}>
                                    <StyledTableCell component="th" scope="data">
                                        {roomNumber}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{price}</StyledTableCell>
                                    <StyledTableCell align="right">{`${discount}%`}</StyledTableCell>
                                    <StyledTableCell align="right">{capacity}</StyledTableCell>
                                    <StyledTableCell align="right"> {isActive === true ? "Yes" : "NO"} </StyledTableCell>
                                    <StyledTableCell align="right">


                                        <DropdownForAds

                                            onView={() => viewRoom(_id)}
                                            onDelete={() => handelShowForDelete(_id)}
                                            EditButton={() => editData(_id, isActive)}


                                        />





                                    </StyledTableCell>
                                </StyledTableRow>


                            })}


                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>



            <ViewDetails

                open={showModal}
                onClose={handleClose}

                AddDetails={getAdsDataDetails}
                loaderState={compRise}


            />



            <EditAds
                onClose={handleCloseForEdit}
                open={showModalForEdit}
                activeAndId={activeId}
                reRender={getAllAds}
            />
            <DeleteConfirmation
                itemName="Room"
                open={showModalForDelete}
                onClose={handleCloseForDelete}
                onConfirm={deleteRoomAd}
            />
            <AddNewAdd fetchAds={getAllAds} roomData={getRoomId} onOpen={openForAdd} onClos={() => setOpenForAdd(false)} />

        </>

    )

}
