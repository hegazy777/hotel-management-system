import { Box, Typography } from "@mui/material";

const houses = [
  {
    title: "Tabby Town",
    location: "Gunung Batu, Indonesia",
    img: "https://i.ibb.co/ZzKntNV/greenhouse.png",
    popular: true,
  },
  {
    title: "Anggana",
    location: "Bogor, Indonesia",
    img: "https://i.ibb.co/YfB3RrK/pool.png",
  },
  {
    title: "Seattle Rain",
    location: "Jakarta, Indonesia",
    img: "https://i.ibb.co/ZBdr7mF/garden.png",
  },
  {
    title: "Wooden Pit",
    location: "Wonosobo, Indonesia",
    img: "https://i.ibb.co/Z8yt4CH/wooden-house.png",
  },
];

export default function BackyardHousesSection() {
  return (
    <Box sx={{ px: 4, py: 6, backgroundColor: "#fff" }}>
      <Typography variant="h5" fontWeight="bold" color="#1f2b6c" mb={3}>
        Houses with beauty backyard
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {houses.map((house, index) => (
          <Box
            key={index}
            sx={{
              flex: { xs: "100%", sm: "45%", md: "23%" },
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              backgroundColor: "white",
            }}
          >
            <Box
              component="img"
              src={house.img}
              alt={house.title}
              sx={{ width: "100%", height: 200, objectFit: "cover" }}
            />

            {house.popular && (
              <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#FF498B",
                    color: "#fff",
                    borderBottomLeftRadius: "12px",
                    px: 2,
                    py: 0.8,
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    zIndex: 2,
                }}
              >
                Popular Choice
              </Box>
            )}

            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" color="#1f2b6c">
                {house.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {house.location}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
