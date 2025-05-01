import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export default function SharedTable({
  columns = [],
  rows = [],
  onMenuClick,
}) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#dfe3eb" }}>
            {columns.map((col, index) => (
              <TableCell key={index} sx={{ fontWeight: "bold" }}>
                {col.label}
              </TableCell>
            ))}
            <TableCell /> {/* actions */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} sx={{ backgroundColor: "#fdfdfd" }}>
              {columns.map((col, index) => (
                <TableCell key={index}>
                  {col.render ? col.render(row) : row[col.field]}
                </TableCell>
              ))}
              <TableCell align="right">
                <IconButton onClick={(e) => onMenuClick(e, row._id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
