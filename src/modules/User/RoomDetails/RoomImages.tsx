import { Box, Grid } from "@mui/material";

export default function RoomImages({ images }: { images: string[] }) {
  const imageCount = images?.length || 0;
  const firstImage = images?.[0];
  const restImages = images?.slice(1, 5);

  const getImageStyle = (index: number) => {
    const baseStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover" as
        | "fill"
        | "contain"
        | "cover"
        | "none"
        | "scale-down",
      display: "block",
    };

    if (imageCount === 1) {
      return { ...baseStyle, aspectRatio: "16 / 9" };
    }

    if (imageCount === 2) {
      return { ...baseStyle, aspectRatio: "4 / 3" };
    }

    if (imageCount === 3) {
      return {
        ...baseStyle,
        aspectRatio: index === 0 ? "4 / 3" : "2 / 1",
      };
    }

    if (imageCount >= 4) {
      return {
        ...baseStyle,
        aspectRatio: index === 0 ? "4 / 3" : "1 / 1",
      };
    }

    return baseStyle;
  };
  return (
    <div>
      <Box sx={{ width: "100%", padding: 2 }}>
        <Grid container spacing={2}>
          {firstImage && (
            <Grid size={{ xs: 12, md: imageCount > 1 ? 6 : 12 }}>
              <img src={firstImage} alt="Image 1" style={getImageStyle(0)} />
            </Grid>
          )}

          {imageCount > 1 && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid
                container
                spacing={2}
                // direction={imageCount === 3 ? "column" : "row"}
              >
                {restImages?.map((img, idx) => (
                  <Grid key={idx} size={{ xs: imageCount > 3 ? 6 : 12 }}>
                    <img
                      src={img}
                      alt={`Image ${idx + 2}`}
                      style={getImageStyle(idx + 1)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}
