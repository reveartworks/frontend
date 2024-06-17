import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
import { Outlet, Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Stages(props) {
  var breadcrumbs = [];
  if (props.stage == "artwork") {
    breadcrumbs = [
      <Link
        key="1"
        color="inherit"
        to="/"
        style={{ textDecoration: "none", color: "black" }}
        // onClick={handleClick}
      >
        Home
      </Link>,
      <Typography
        key="2"
        color="text.primary"
        style={{ textDecoration: "none", color: "rgba(31, 165, 141, 1)" }}
      >
        Artworks
      </Typography>,
    ];
  } else {
    breadcrumbs = [
      <Link
        key="1"
        color="inherit"
        to="/"
        style={{ textDecoration: "none" }}
        // onClick={handleClick}
      >
        Home
      </Link>,
      <Link
        key="2"
        color="inherit"
        to="/viewartlist"
        style={{ textDecoration: "none" }}
        // onClick={handleClick}
      >
        Artworks
      </Link>,
      <Typography
        key="3"
        color="text.primary"
        style={{ textDecoration: "none", color: "rgba(31,165,141,1)" }}
      >
        Details
      </Typography>,
    ];
  }

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
