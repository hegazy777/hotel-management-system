import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, TextField } from "@mui/material";
import { format } from "date-fns";

export default function DateRangePicker() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null
  );
  const [endDate, setEndDate] = useState(
    searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (startDate) {
      params.set("startDate", format(startDate, "yyyy-MM-dd"));
    }

    if (endDate) {
      params.set("endDate", format(endDate, "yyyy-MM-dd"));
    }

    if (startDate || endDate) {
      navigate({ search: params.toString() });
    }
  }, [startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}
