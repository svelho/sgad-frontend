import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { ListPolicies } from "../../models/policy";
import "./policyTable.css";
import { UseAxiosDelete, UseAxiosPost } from "../../hooks/axios";
import Credentials from "../../models/credentials";
import Loading from "../loading/loading";

export default function BasicTable({ policies }: ListPolicies) {
  //const [rows, setRows] = React.useState(data);
  let [success, setSuccess] = useState(true);
  let [policiesFiltered, setPoliciesFiltered] = useState(policies);

  const deleteRow = (id: string, index: number) => {
    console.log("The id is ", id);
    setSuccess(false);
    const cred = localStorage.getItem("credentials");
    const credential = JSON.parse(cred ?? "") as Credentials;

    const headers = {
      Authorization: `Bearer ${credential.token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    UseAxiosDelete(
      `${process.env.REACT_APP_BACKEND}/policy/delete/${id}`,
      headers
    ).then((data) => {
      setSuccess(data);
      if (data) {
        alert("deletado com sucesso!");
        setPoliciesFiltered(policiesFiltered.filter((v, i) => i !== index));
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
              <TableCell>Título</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Nivel</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policiesFiltered.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.level}</TableCell>
                <TableCell align="right">
                  {/* <Button
                  variant="contained"
                  color={row.description ? "primary" : "secondary"}
                  onClick={() => {
                    handleChangeConnect(row.id ?? "");
                  }}
                >
                  {row.description ? "disconnect" : "connect"}
                </Button> */}

                  <IconButton
                    aria-label="delete"
                    className="iconButton"
                    onClick={() => deleteRow(row.id ?? "", index)}
                  >
                    {" "}
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
