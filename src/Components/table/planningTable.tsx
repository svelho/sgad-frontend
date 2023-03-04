import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { ListPlanning } from "../../models/planning";
import "./planningTable.css";
import { UseAxiosDelete, UseAxiosPost } from "../../hooks/axios";
import Credentials from "../../models/credentials";
import Loading from "../loading/loading";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#94ec91",
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

export default function BasicTable({ arrayPlanning }: ListPlanning) {
  //const [rows, setRows] = React.useState(data);
  let [success, setSuccess] = useState(true);
  let [planningFiltered, setPlanningFiltered] = useState(arrayPlanning);

  const levelConvertToDescription = (level: number) => {
    if (level === 25) {
      return "Necessário";
    } else if (level === 50) {
      return "Relevante";
    } else if (level === 75) {
      return "Muito Relevante";
    } else if (level === 100) {
      return "Imprescindível";
    }
  };

  const deleteRow = (id: string, index: number) => {
    setSuccess(false);
    const cred = localStorage.getItem("credentials");
    const credential = JSON.parse(cred ?? "") as Credentials;

    const headers = {
      Authorization: `Bearer ${credential.token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    UseAxiosDelete(
      `${process.env.REACT_APP_BACKEND}/v1/planning/delete/${id}`,
      headers
    ).then((data) => {
      setSuccess(data);
      if (data) {
        alert("deletado com sucesso!");
        setPlanningFiltered(planningFiltered.filter((v, i) => i !== index));
      } else {
        alert("Erro ao tentar deletar política");
      }
    });
  };

  if (!success) return <Loading />;
  else
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell align="right">Descrição</StyledTableCell>
              <StyledTableCell align="right">Nivel</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planningFiltered.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {/* {levelConvertToDescription(row.level ?? 0)} */}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    aria-label="delete"
                    className="iconButton"
                    onClick={() => deleteRow(row.id ?? "", index)}
                  >
                    {" "}
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
