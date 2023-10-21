import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Stack className="w-screen h-full flex justify-center items-center" sx={{ color: "grey.500" }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
      {/* <CircularProgress color="success" />
      <CircularProgress color="inherit" /> */}
    </Stack>
  );
}
