import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { apiRequest } from "../Util/axiosInstance";
import { Outlet, Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(31, 165, 141)",
    color: theme.palette.common.white,
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

export default function ContactDataTable(props) {
  const [rows, setRows] = useState(props.rows);

  async function updatePurchaseEnquiryStatus(row, seenStatus, contactedStatus) {
    try {
      const result = await apiRequest("POST", "/updateEnquiryStatus", {
        type: "contact",
        enquiryId: row.id,
        seen: seenStatus,
        contacted: contactedStatus,
      });
      console.log(result);
      var tempRows = [];
      rows.forEach((element) => {
        if (element.id === row.id) {
          element.seen = seenStatus;
          element.contacted = contactedStatus;
          tempRows.push(element);
        } else {
          tempRows.push(element);
        }
      });
      setRows(tempRows);
    } catch (error) {
      alert("Failed to update purchase enquiry status");
      console.log(error);
    }
  }

  function handleSeen(row) {
    rows.forEach((element) => {
      if (element.id === row.id) {
        try {
          var seenStatus = element.seen ? false : true;
          updatePurchaseEnquiryStatus(row, seenStatus, element.contacted);
          throw new Error("Ignore: Stop the enquiry loop");
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  function handleContacted(row) {
    rows.forEach((element) => {
      if (element.id === row.id) {
        try {
          var contactedStatus = element.contacted ? false : true;
          updatePurchaseEnquiryStatus(row, element.seen, contactedStatus);
          throw new Error("Ignore: Stop the enquiry loop");
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  async function deleteContactEnqiry(enquiryId) {
    try {
      var del = window.confirm("Do you want to delete this enquiry?");
      if (del) {
        try {
          const result = await apiRequest("POST", "/deleteEnquiry", {
            type: "contact",
            enquiryId: enquiryId,
          });
          var tempRows = [];
          rows.forEach((element) => {
            if (element.id != enquiryId) {
              tempRows.push(element);
            }
          });
          setRows(tempRows);
        } catch (error) {
          alert("Failed to delete purchase enquiry.");
          console.log(error);
        }
      }
    } catch (e) {}
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="left">Comments</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Seen</StyledTableCell>
            <StyledTableCell align="right">Contacted</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.comments}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                <input
                  type="checkbox"
                  checked={row.seen}
                  onChange={(e) => handleSeen(row)}
                  style={{ accentColor: "rgb(31, 165, 141)" }}
                ></input>
              </StyledTableCell>
              <StyledTableCell align="right">
                <input
                  type="checkbox"
                  checked={row.contacted}
                  onChange={(e) => handleContacted(row)}
                  style={{ accentColor: "rgb(31, 165, 141)" }}
                ></input>
              </StyledTableCell>
              <StyledTableCell align="right">
                <DeleteOutlineIcon
                  style={{ color: "red" }}
                  onClick={() => {
                    deleteContactEnqiry(row.id);
                  }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
