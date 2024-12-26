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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContactDataTable from "../../Component/ContactDataTable";

export function ContactEnquiries(props) {
  var imageList = [];
  //   alert(typeof localStorage.getItem("loggedIn"));
  if (
    sessionStorage.getItem("loggedIn") == "false" ||
    !sessionStorage.getItem("loggedIn")
  ) {
    window.location.href = "/adminlogin";
  }

  const [image, setImage] = new useState(Image);
  const [loading, setLoading] = useState(false);
  const [gotPurchaseEnquiries, setGotPurchaseEnquiries] = useState(false);
  const [rows, setRows] = useState([]);

  const getPurchaseEnquiries = async (e) => {
    var passCode = prompt("Please provide your passcode");
    if (passCode) {
      try {
        setLoading(true);
        const result = await apiRequest("POST", "/getContactEnquiries", {
          passCode: passCode,
        });
        console.log(result);
        setGotPurchaseEnquiries(true);
        setRows(result);

        setLoading(false);
        //   }
      } catch (error) {
        if (error.response.data.message == "Invalid Passcode") {
          alert("Invalid Passcode");
          getPurchaseEnquiries();
        } else {
          alert("Failed to fetch purchase enquiry data.");
        }
        console.error("Failed to fetch purchase enquiry data:", error);
      } finally {
        setLoading(false);
      }
    } else if (passCode === null) {
      alert("Passcode Invalid.");
    }
  };

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
            backgroundImage: `url(${image})`,
            //   backgroundColor: "#cccccc",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: props.isMobile || props.isMobileLandscape ? "10vh" : "14vh",
          }}
        >
          {/* <img src={`data:image/png;base64,${image}`} /> */}&nbsp;
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          //   marginTop: props.isMobile ? "-10%" : "",
        }}
      >
        {/* <Container fixed> */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // marginLeft: props.isMobile ? "" : "2%",
              marginTop: "1%",
            }}
          >
            <div
              className="center"
              style={{
                marginTop: "10%",
                marginBottom: "2%",
                display: gotPurchaseEnquiries ? "none" : "block",
                cursor: "pointer",
              }}
              onClick={(e) => getPurchaseEnquiries(e)}
            >
              <button
                //   variant="outlined"
                style={{
                  color: "rgb(31, 165, 141)",
                  border: "1px solid rgb(31, 165, 141)",
                  borderRadius: "20px",
                  height: "30px",
                  width: "300px",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
              >
                Show Contact Enquiries
              </button>
            </div>
            {loading ? (
              <div style={{ height: "100vh" }}>
                <Loading
                  isMobile={props.isMobile}
                  isMobileLandscape={props.isMobileLandscape}
                />
              </div>
            ) : rows.length > 0 ? (
              <div
                style={{
                  width: "90%",
                  margin: "auto",
                  // marginleft: "-2%",
                  marginBottom: "2%",
                }}
              >
                <ContactDataTable rows={rows}></ContactDataTable>
              </div>
            ) : null}
          </div>
        </div>
        {/* </Container> */}
      </div>
      <Footer
        isMobile={props.isMobile}
        isMobileLandscape={props.isMobileLandscape}
      ></Footer>
    </div>
  );
}
