import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Typography } from "@mui/material";

const MasterpiecesTableComp = ({ data, rewardTitle }) => {
  const tableHeadStyle = {
    fontWeight: "900",
    fontSize: "1.5rem",
  };
  return (
    <>
      <h4 className="list-header u-margin-bottom-medium"> {"Ödül Listesi - " + rewardTitle} </h4>
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{ maxWidth: 700, border: "1px solid black" }}
      >
        <Table sx={{ width: "100%", margin: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeadStyle}>Başlık</TableCell>
              <TableCell sx={tableHeadStyle} align="right">
                Eser Sahibi
              </TableCell>
              <TableCell sx={tableHeadStyle} align="right">
                Tarih
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((m) => (
              <TableRow
                key={m?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="m">
                  <Typography>{m?.title} </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography> {m?.owner} </Typography>{" "}
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {moment(m?.createDateTime).format("DD/MM/YY")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MasterpiecesTableComp;
