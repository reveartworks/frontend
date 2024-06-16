import { Button, Container, Grid, List, ListItem, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Outlet, Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import grid1Image from "../Images/_NP_0017.JPG";
import grid2Image from "../Images/_NP_0019.JPG";
import grid3Image from "../Images/_NP_0022.JPG";
import grid4Image from "../Images/_NP_0023.JPG";
import grid5Image from "../Images/_NP_0105.JPG";
import grid6Image from "../Images/_NP_0107.JPG";
import logo from "../Images/logo.png";
import logoFooter from "../Images/logoFooter.png";
import xLogo from "../Images/x.png";
import fbLogo from "../Images/fb.png";
import instaLogo from "../Images/insta.png";
import bgImage from "../Images/backgroundImg.svg";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ToolBar } from "../Component/Toolbar";
import { useState } from "react";
import { Image } from "./image";

import { Header } from "../Component/Header";

import Stages from "../Component/Stages";
import { Footer } from "../Component/Footer";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export function ListArt() {
  const openArtPage = () => {
    window.location.href = "/viewartlist";
  };
  var imageList = [];
  for (var i = 0; i < 10; i++) {
    imageList.push(Image);
  }

  const [image, setImage] = new useState(Image);
  const [images, setImages] = new useState(imageList);
  const imageOverlay = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px",
    borderRadius: "20px",
    textAlign: "left",
    left: "12px",
    color: "white",
    fontSize: "1rem",
    marginLeft: "5%",
    maxWidth: "60%",
  };
  const imageOverlayMini = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px",
    borderRadius: "20px",
    textAlign: "left",
    left: "12px",
    color: "white",
    fontSize: "1rem",
    marginLeft: "5%",
    maxWidth: "80%",
    maxHeight: "8rem",
  };
  return (
    <div>
      {/* <ToolBar /> */}
      <Header></Header>
      <div>
        <div
          className="slide"
          style={{
            width: "100%",
            backgroundImage: `url('data:image/png;base64,${image}')`,
            //   backgroundColor: "#cccccc",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "14vh",
          }}
        >
          {/* <img src={`data:image/png;base64,${image}`} /> */}&nbsp;
        </div>
      </div>
      <div style={{ backgroundImage: `url(${bgImage})` }}>
        {/* <Container fixed> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* <div
            style={{
              width: "20%",
              height: "150vh",
              backgroundColor: "rgba(238,250,249,1)",
              overflow: "scroll",
            }}
          >
            abdul salam
          </div> */}
          <div
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              marginLeft: "2%",
              marginTop: "1%",
            }}
          >
            <div>
              <Stages stage="artwork"></Stages>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // marginLeft: "1%",
                marginRight: "3%",
                alignItems: "baseline",
              }}
            >
              <div style={{ marginTop: "-1%" }}>
                <p className="" style={{ fontSize: "2rem" }}>
                  Artworks{" "}
                </p>
              </div>
              <div>Sort by:</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: "-1%",
              }}
            >
              {images.map((item) => (
                <div style={{ marginBottom: "2%", marginRight: "2%" }}>
                  <Link
                    to="/artDetails/id"
                    style={{ textDecoration: "none", color: "gray" }}
                  >
                    <img
                      src={`data:image/png;base64,${item}`}
                      style={{
                        height: "250px",
                        width: "250px",
                        borderRadius: "10px",
                      }}
                    ></img>
                    <div style={{ marginLeft: "2%" }}>
                      abdul salam
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={2.5}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="center" style={{ marginBottom: "2%" }}>
              <button
                //   variant="outlined"
                style={{
                  color: "black",
                  border: "1px solid black",
                  borderRadius: "20px",
                  height: "30px",
                  width: "100px",
                  backgroundColor: "white",
                }}
                // onClick={openArtPage}
              >
                Show More
              </button>
            </div>
          </div>
        </div>
        {/* </Container> */}
      </div>
      <Footer></Footer>
    </div>
  );
}
