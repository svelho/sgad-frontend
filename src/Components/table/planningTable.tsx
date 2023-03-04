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
import Policies from "../../pages/policies/policies";

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
              <StyledTableCell align="left">Atividade</StyledTableCell>
              <StyledTableCell align="left">Objetivo</StyledTableCell>
              <StyledTableCell align="left">Meta1</StyledTableCell>
              <StyledTableCell align="left">Meta2</StyledTableCell>
              <StyledTableCell align="left">Meta3</StyledTableCell>
              <StyledTableCell align="left">Políticas</StyledTableCell>
              <StyledTableCell align="left">Stakeholders</StyledTableCell>
              <StyledTableCell align="left">Data de Início</StyledTableCell>
              <StyledTableCell align="left">Excluir</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planningFiltered.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.activity?.title}
                </StyledTableCell>
                <StyledTableCell align="left">{row.objective}</StyledTableCell>
                <StyledTableCell align="left">{row.goal1}</StyledTableCell>
                <StyledTableCell align="left">{row.goal2}</StyledTableCell>
                <StyledTableCell align="left">{row.goal3}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.policies
                    ?.map((x) => {
                      return x.title;
                    })
                    .join(", ")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.stakeholders
                    ?.map((x) => {
                      return x.name;
                    })
                    .join(", ")}
                </StyledTableCell>
                <StyledTableCell align="right">Data de Início</StyledTableCell>
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
