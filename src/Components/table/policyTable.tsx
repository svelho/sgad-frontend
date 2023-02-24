import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { ListPolicies } from "../../models/policy";

function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  isConnected: boolean
) {
  return { id, name, calories, fat, carbs, protein, isConnected };
}

const data = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0, true),
  createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3, false),
  createData(3, "Eclair", 262, 16.0, 24, 6.0, false),
  createData(4, "Cupcake", 305, 3.7, 67, 4.3, false),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9, false),
];

export default function BasicTable({ policies }: ListPolicies) {
  //const [rows, setRows] = React.useState(data);
  const handleChangeConnect = (id: string) => {
    console.log("The id is ", id);
    // setRows(
    //   rows.map((row) => {
    //     if (row.id == id) {
    //       return { ...row, isConnected: !row.isConnected };
    //     } else return { ...row };
    //   })
    // );
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell align="right">Descrição</TableCell>
            <TableCell align="right">Nivel</TableCell>
            <TableCell align="right">Is connected</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {policies.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.level}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color={row.description ? "primary" : "secondary"}
                  onClick={() => {
                    handleChangeConnect(row.id ?? "");
                  }}
                >
                  {row.description ? "disconnect" : "connect"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { IconButton } from "@mui/material";
// import { ListPolicies } from "../../models/policy";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#2e6936",
//     color: theme.palette.common.white,
//     fontSize: 16,
//     fontWeight: 900,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// // function createData(
// //   name: string,
// //   email: number,
// //   telefone: number,
// //   area: number,
// //   cargo: number
// // ) {
// //   return { name, email, telefone, area, cargo };
// // }

// // const rows = [
// //   createData("fulano x", 159, 6.0, 24, 4.0),
// //   createData("fulano y", 237, 9.0, 37, 4.3),
// //   createData("fulano z", 262, 16.0, 24, 6.0),
// //   createData("fulano xx", 305, 3.7, 67, 4.3),
// //   createData("fulano abc", 356, 16.0, 49, 3.9),
// // ];

// export default function PolicyTable({ policies }: ListPolicies) {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>a</StyledTableCell>
//             <StyledTableCell>Title</StyledTableCell>
//             <StyledTableCell>Description</StyledTableCell>
//             <StyledTableCell>Level</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {policies.map((row) => (
//             <TableRow key={row.id} sx={{ "& > *": { borderBottom: "unset" } }}>
//               <TableCell>
//                 <IconButton
//                   aria-label="expand row"
//                   size="small"
//                   onClick={() => {}}
//                 ></IconButton>
//               </TableCell>
//               <StyledTableCell>{row.title}</StyledTableCell>
//               <StyledTableCell>{row.description}</StyledTableCell>
//               <StyledTableCell>{row.level}</StyledTableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
