import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading(props) {
  // console.log(props);
  return (
    <div
      style={{
        // position: "absolute",
        zIndex: props.uploadPage ? "" : "5",
        // marginTop: props.isMoblile ? "" : "45vh",
        // marginLeft: props.isMoblile ? "40vw" : "45vw",
        width: "100%",
      }}
    >
      <div
        style={{
          width: props.uploadPage ? "20%" : props.isMobile ? "20%" : "3%",
          margin: "auto",
          marginTop: props.uploadPage ? "" : "20%",
          marginBottom: props.uploadPage ? "" : "20%",
        }}
      >
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          {/* <CircularProgress color="secondary" /> */}
          <CircularProgress color="success" />
          {/* <CircularProgress color="inherit" /> */}
        </Stack>
      </div>
    </div>
  );
}
