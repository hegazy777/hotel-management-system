import { Box, Grid, Typography } from "@mui/material";
import icon_bedroom from "../../../assets/icon_bedroom.png";
import icon_livingroom from "../../../assets/icon_livingroom.png";
import icon_bathroom from "../../../assets/icon_bathroom.png";
import icon_diningroom from "../../../assets/icon_diningroom.png";
import icon_wifi from "../../../assets/icon_wifi.png";
import icon_ac from "../../../assets/icon_ac.png";
import icon_friage from "../../../assets/icon_friage.png";
import icon_tv from "../../../assets/icon_tv.png";

import { ReactNode } from "react";

export default function RoomDescription({ children }: { children: ReactNode }) {
  //   const handleBooking = async () => {};
  const facilities = [
    { img: icon_bedroom, name: "bedroom", count: 5 },
    { img: icon_livingroom, name: "living room", count: 1 },
    { img: icon_bathroom, name: "bathroom", count: 3 },
    { img: icon_diningroom, name: "dining room", count: 1 },
    { img: icon_wifi, name: "mbp/s", count: 10 },
    { img: icon_ac, name: "unit ready", count: 7 },
    { img: icon_friage, name: "refigrator", count: 2 },
    { img: icon_tv, name: "television", count: 4 },
  ];
  return (
    <Box sx={{ paddingY: 5, paddingX: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box>
            <Typography
              sx={{ lineHeight: 1.7 }}
              variant="body1"
              color="#B0B0B0"
            >
              Minimal techno is a minimalist subgenre of techno music. It is
              characterized by a stripped-down aesthetic that exploits the use
              of repetition and understated development. Minimal techno is
              thought to have been originally developed in the early 1990s by
              Detroit-based producers Robert Hood and Daniel Bell.
              <br />
              <br />
              Such trends saw the demise of the soul-infused techno that
              typified the original Detroit sound. Robert Hood has noted that he
              and Daniel Bell both realized something was missing from techno in
              the post-rave era.
              <br />
              <br />
              Design is a plan or specification for the construction of an
              object or system or for the implementation of an activity or
              process, or the result of that plan or specification in the form
              of a prototype, product or process. The national agency for
              design: enabling Singapore to use design for economic growth and
              to make lives better.
            </Typography>
          </Box>
          <Grid container spacing={5} rowSpacing={4} paddingY={3}>
            {facilities.map(({ img, name, count }, index) => (
              <Grid size={3} key={index}>
                <img src={img} alt={img} />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    {count}{" "}
                  </span>
                  {name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {children}
      </Grid>
    </Box>
  );
}
