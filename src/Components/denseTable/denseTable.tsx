import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Credentials, { ListCredentials } from "../../models/credentials";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2e6936",
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 900,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(
//   name: string,
//   email: number,
//   telefone: number,
//   area: number,
//   cargo: number
// ) {
//   return { name, email, telefone, area, cargo };
// }

// const rows = [
//   createData("fulano x", 159, 6.0, 24, 4.0),
//   createData("fulano y", 237, 9.0, 37, 4.3),
//   createData("fulano z", 262, 16.0, 24, 6.0),
//   createData("fulano xx", 305, 3.7, 67, 4.3),
//   createData("fulano abc", 356, 16.0, 49, 3.9),
// ];

export default function DenseTable({ users }: ListCredentials) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell>E-Mail</StyledTableCell>
            <StyledTableCell>Telefone</StyledTableCell>
            <StyledTableCell>Area</StyledTableCell>
            <StyledTableCell>Cargo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.uid}>
              <StyledTableCell scope="row">{row.name}</StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
              <StyledTableCell>{row.phone}</StyledTableCell>
              <StyledTableCell>{row.area}</StyledTableCell>
              <StyledTableCell>{row.position}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
