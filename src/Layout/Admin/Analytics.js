import { Button, Container, Grid, List, ListItem, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Outlet, Link } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import bgImage from "../../Images/backgroundLogo.png";
import { useState, useEffect } from "react";
import { Image } from "../image";
import addImageIcon from "../../Images/addImage.png";

import { Header } from "../../Component/Header";

import Stages from "../../Component/Stages";
import { Footer } from "../../Component/Footer";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { apiRequest } from "../../Util/axiosInstance";
import Loading from "../../Component/Loading";

// import { Grid } from "@material-ui/core";
import BarChartComponent from "../../Component/BarChartComponent";

export function Analytics(props) {
  var imageList = [];
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  //   alert(typeof localStorage.getItem("loggedIn"));
  if (
    sessionStorage.getItem("loggedIn") == "false" ||
    !sessionStorage.getItem("loggedIn")
  ) {
    window.location.href = "/adminlogin";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiRequest("GET", "/userVisitMetrics"); // Replace with your API endpoint
        // console.log(result);
        // console.log(typeof result);

        setMetrics(result);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <ToolBar /> */}
      <Header
        isMobile={props.isMobile}
        isMobileLandscape={props.isMobileLandscape}
      ></Header>
      <div>
        <div
          className="slide"
          style={{
            width: "100%",
            backgroundImage: `url(${Image})`,
            //   backgroundColor: "#cccccc",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: props.isMobile || props.isMobileLandscape ? "10vh" : "14vh",
          }}
        >
          {/* <img src={`data:image/png;base64,${image}`} /> */}&nbsp;
        </div>
      </div>
      {loading ? (
        <div style={{ height: "100vh" }}>
          <Loading
            isMobile={props.isMobile}
            isMobileLandscape={props.isMobileLandscape}
          />
        </div>
      ) : null}
      <div style={{ marginBottom: "20px" }}>&nbsp;</div>
      <div style={{ width: "95%", margin: "auto" }}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={6}>
            {metrics && (
              <div
                style={{
                  borderRadius: "20px",
                  boxShadow: "0px 0px 15px 10px lightgray",
                }}
              >
                <BarChartComponent
                  data={metrics.daily}
                  title="Daily Visits"
                  xKey="date"
                  yKey="visitCount"
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {metrics && (
              <div
                style={{
                  borderRadius: "20px",
                  boxShadow: "0px 0px 15px 10px lightgray",
                  paddingTop: "10px",
                }}
              >
                <BarChartComponent
                  data={metrics.monthly}
                  title="Monthly Visits"
                  xKey="date"
                  yKey="visitCount"
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {metrics && (
              <div
                style={{
                  borderRadius: "20px",
                  boxShadow: "0px 0px 15px 10px lightgray",
                  paddingTop: "10px",
                }}
              >
                <BarChartComponent
                  data={metrics.quarterly}
                  title="Quarterly Visits"
                  xKey="date"
                  yKey="visitCount"
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {metrics && (
              <div
                style={{
                  borderRadius: "20px",
                  boxShadow: "0px 0px 15px 10px lightgray",
                  paddingTop: "10px",
                }}
              >
                <BarChartComponent
                  data={metrics.yearly}
                  title="Yearly Visits"
                  xKey="date"
                  yKey="visitCount"
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {metrics && (
              <div
                style={{
                  borderRadius: "20px",
                  boxShadow: "0px 0px 15px 10px lightgray",
                  paddingTop: "10px",
                }}
              >
                <BarChartComponent
                  data={metrics.top_artworks}
                  title="Top Artworks Access Count"
                  xKey="artworkName"
                  yKey="accessCount"
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {metrics && (
              <div
                style={{
                  borderRadius: "20px",
                  boxShadow: "0px 0px 15px 10px lightgray",
                  paddingTop: "10px",
                }}
              >
                <BarChartComponent
                  data={metrics.top_contact_artworks}
                  title="Top Contact Artworks"
                  xKey="artworkName"
                  yKey="contactCount"
                />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
      <div style={{ marginBottom: props.isMobile ? "20px" : "20px" }}>
        &nbsp;
      </div>
      <Footer
        isMobile={props.isMobile}
        isMobileLandscape={props.isMobileLandscape}
      ></Footer>
    </div>
  );
}
