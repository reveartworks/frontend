import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Image } from "../Layout/image";
export default function Loading(props) {
  // console.log(props);
  return (
    <div
      style={{
        // position: "absolute",
        // zIndex: props.uploadPage ? "" : "5",
        // marginTop: props.isMoblile ? "" : "45vh",
        // marginLeft: props.isMoblile ? "40vw" : "45vw",
        width: "100%",
        height: props.isHome ? "100vh" : "20vh",
        paddingTop: props.isHome ? (props.isMobile ? "40vh" : "10%") : "",
        backgroundImage: props.isHome ? `url(${Image})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: props.uploadPage ? "20%" : props.isMobile ? "20%" : "3%",
          margin: "auto",
          marginTop: props.uploadPage ? "" : "20%",
          marginBottom: props.uploadPage ? "" : "20%",
          paddingLeft: props.isMobile ? "10%" : "",
        }}
      >
        <Stack sx={{ color: "white" }} spacing={2} direction="row">
          {/* <CircularProgress color="secondary" /> */}
          <CircularProgress color={props.isHome ? "inherit" : "success"} />
          {/* <CircularProgress color="inherit" /> */}
        </Stack>
      </div>
    </div>
  );
}
