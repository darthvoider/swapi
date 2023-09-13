import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IStarship } from "../../types";

export const StarshipsTable = ({
  starships,
}: {
  starships: (IStarship | undefined)[];
}): React.ReactElement | null => {
  if (!starships.length) return null;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Starship Name</TableCell>
            <TableCell>Starship Model</TableCell>
            <TableCell>Passengers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {starships.map((starship, index) => (
            <TableRow
              key={`${starship?.name}_${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {starship?.name}
              </TableCell>
              <TableCell>{starship?.model}</TableCell>
              <TableCell>{starship?.passengers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
