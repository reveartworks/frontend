import { Container, Typography } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import bgImage from "../Images/backgroundLogo.png";
import contactLogo from "../Images/contactLogo0.png";

import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { Image } from "./image";

import { Header } from "../Component/Header";

import Stages from "../Component/Stages";
import { Footer } from "../Component/Footer";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { apiRequest } from "../Util/axiosInstance";
import Loading from "../Component/Loading";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  height: "fit-content",
  width: "60vw",
};

export function ViewArt(props) {
  var imageId = useParams().id;
  // alert(imageId);
  const openArtPage = () => {
    window.location.href = "/viewartlist";
  };
  var imageList = [];
  // for (var i = 0; i < 5; i++) {
  //   imageList.push(Image);
  // }

  const [image, setImage] = new useState(Image);
  const [data, setData] = new useState({});
  const [images, setImages] = new useState(imageList);
  const [activeImage, setActiveImage] = useState("");
  const [availableImages, setAvailableImages] = useState(0);
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [contacted, setContacted] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [expandImage, setExpandImage] = useState(false);

  function alerter(field) {
    alert("Please provide your " + field);
  }
  function handleContact() {
    try {
      if (!firstName) {
        alerter("First Name");
        return;
      }
      if (!lastName) {
        alerter("Last Name");
        return;
      }
      if (!email) {
        alerter("Email");
        return;
      }
      if (!comments) {
        alerter("Comments");
        return;
      }
      var contactData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        comments: comments,
        artId: imageId,
        artName: data.name,
        artSize: data.height + "x" + data.width + "'",
        sessionId: sessionStorage.getItem("artSessionId"),
      };
      try {
        const result = apiRequest("POST", "/contactForPurchase", contactData); // Replace with your API endpoint
        // console.log(result);
      } catch (e) {
        setContactError(true);
      }
      // console.log(typeof result);
      setContacted(true);
    } catch (error) {
      setContactError(true);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiRequest(
          "GET",
          "/capturArtMetrics/" +
            sessionStorage.getItem("artSessionId") +
            "/" +
            imageId
        ); // Replace with your API endpoint
        console.log(result);
      } catch (error) {
        console.error("Failed to capture metrics:", error);
      }
      try {
        const result = await apiRequest("GET", "/document/" + imageId); // Replace with your API endpoint
        // console.log(result);
        // console.log(typeof result);
        var imagesLen = 0;
        for (var im in result.images) {
          if (images[im]) {
            imagesLen++;
          }
        }
        setAvailableImages(imagesLen);
        setImages(result.images);
        // setImage(JSON.parse(result.image1).image);
        setActiveImage(result.images[0]);
        setData(result);
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
            backgroundImage: `url(${image})`,
            //   backgroundColor: "#cccccc",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: props.isMobile ? "11vh" : "14vh",
            minHeight: "80px",
          }}
        >
          {/* <img src={`data:image/png;base64,${image}`} /> */}&nbsp;
        </div>
      </div>
      <div style={{ backgroundImage: `url(${bgImage})` }}>
        {/* <Container fixed> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginLeft: "2%",
              marginTop: "1%",
            }}
          >
            <div>
              <Stages
                stage="details"
                isMobile={props.isMobile}
                isMobileLandscape={props.isMobileLandscape}
              ></Stages>
            </div>
            {loading ? (
              <div style={{ height: "100vh" }}>
                <Loading
                  isMobile={props.isMobile}
                  isMobileLandscape={props.isMobileLandscape}
                />
              </div>
            ) : (
              <Container>
                <div
                  id="imageDetails"
                  style={{
                    display: "flex",
                    flexDirection: props.isMobile ? "column" : "row",
                    flexWrap: "wrap",
                    marginTop: "5%",
                  }}
                >
                  <div
                    id="imagesSection"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: props.isMobileLandscape ? "50%" : "",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        width: props.isMobileLandscape
                          ? "100%"
                          : props.isMobile
                          ? "97%"
                          : "70%",
                        height: props.isMobileLandscape
                          ? "80vh"
                          : props.isMobile
                          ? "40vh"
                          : "70vh",
                        minWidth: props.isMobileLandscape
                          ? "250px"
                          : props.isMobile
                          ? "200px"
                          : "550px",
                        backgroundImage: `url(${activeImage})`,
                        borderRadius: "10px",
                        backgroundSize: expandImage ? "contain" : "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        boxShadow: "0 0 25px 10px lightgray",
                      }}
                    >
                      {/* <img src={`data:image/png;base64,${image}`} /> */}
                      &nbsp;
                      {/* {expandImage ? (
                      <p>collapse</p>
                    ) : (
                      <AspectRatioIcon style={{ color: "gray", right: "0" }} />
                    )} */}
                    </div>
                    {expandImage ? (
                      <CloseFullscreenIcon
                        style={{
                          color: "white",
                          margin: "auto",
                          marginTop: "10px",
                          // marginTop: props.isMobile
                          //   ? "95%"
                          //   : props.isMobileLandscape
                          //   ? "90%"
                          //   : "85%",
                          // marginLeft: "85%",
                          padding: "15px",
                          borderRadius: "50%",
                          background: "rgba(137,241,222,1)",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          setExpandImage(false);
                        }}
                      />
                    ) : (
                      <OpenInFullIcon
                        style={{
                          color: "white",
                          margin: "auto",
                          marginTop: "10px",
                          // marginTop: props.isMobile
                          //   ? "75%"
                          //   : props.isMobileLandscape
                          //   ? "90%"
                          //   : "85%",
                          // marginLeft: props.isMobile
                          //   ? "80%"
                          //   : props.isMobileLandscape
                          //   ? "85"
                          //   : "85%",
                          padding: "15px",
                          borderRadius: "50%",
                          background: "rgba(137,241,222,1)",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          setExpandImage(true);
                        }}
                      />
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent:
                          props.isMobileLandscape ||
                          props.isMobile ||
                          availableImages < 4
                            ? "center"
                            : "space-between",
                        flexWrap: "wrap",
                        marginBottom: "5%",
                      }}
                    >
                      {images.map((image) => {
                        return image ? (
                          <div
                            style={{
                              width: props.isMobileLandscape ? "60px" : "100px",
                              height: props.isMobileLandscape
                                ? "60px"
                                : "100px",
                              marginTop: "5%",
                              marginRight:
                                props.isMobileLandscape ||
                                props.isMobile ||
                                availableImages < 4
                                  ? "2%"
                                  : "",
                              border:
                                activeImage == image
                                  ? "4px solid rgb(31,165,141,1)"
                                  : "none",
                              borderRadius: "10px",
                              backgroundImage: `url(${image})`,
                              borderRadius: "10px",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              cursor: "pointer",
                              display: image ? "block" : "none",
                            }}
                            onClick={(e) => {
                              setActiveImage(image);
                            }}
                          >
                            &nbsp;
                          </div>
                        ) : null;
                      })}
                      {/* abdul */}
                    </div>
                  </div>
                  {data.name ? (
                    <div
                      id="detailsSection"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: props.isMobile ? "" : "5%",
                        maxWidth: "500px",
                        alignItems: props.isMobile ? "center" : "",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: props.isMobile ? "center" : "start",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: props.isMobileLandscape
                                ? "2rem"
                                : props.isMobile
                                ? "1.5rem"
                                : "3rem",
                              marginBottom: "1%",
                              fontFamily: "serif",
                              marginTop: "0",
                              textTransform: "capitalize",
                            }}
                          >
                            {data.name}
                          </p>
                        </div>
                        <div>
                          <Stack spacing={1}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={parseFloat(data.rating)}
                              precision={0.5}
                              readOnly
                              size="large"
                            />
                          </Stack>
                        </div>
                      </div>
                      {/* <br /> */}
                      <br />
                      <div
                        style={{
                          textAlign: props.isMobile ? "center" : "start",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.9rem",
                            marginBottom: "0px",
                            color: "black",
                          }}
                        >
                          Size:
                        </p>
                        <div
                          style={{
                            width: "100px",
                            height: "30px",
                            border: "1px solid rgb(31,165,141,1)",
                            color: "black",
                            // backgroundColor: "rgb(31,165,141,1)",
                            borderRadius: "15px",
                            textAlign: "center",
                            alignContent: "center",
                            marginTop: "2%",
                            fontSize: "0.8rem",
                          }}
                        >
                          <div style={{ margin: "auto" }}>
                            {data.height}x{data.width}'
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleOpen}
                        style={{
                          color: "white",
                          backgroundColor: "rgb(31,165,141,1)",
                          width: "270px",
                          height: "50px",
                          borderRadius: "25px",
                          border: "none",
                          marginTop: "5%",
                          fontSize: "1.1rem",
                          cursor: "pointer",
                        }}
                      >
                        Contact Us For Purchase
                      </button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={modalStyle}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                              }}
                            >
                              <div>
                                <img src={contactLogo} />
                              </div>
                              <div style={{ alignContent: "center" }}>
                                <CloseIcon
                                  fontSize="large"
                                  style={{ color: "gray", cursor: "pointer" }}
                                  onClick={handleClose}
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: props.isMobile
                                  ? "column"
                                  : "row",
                                maxHeight: props.isMobile
                                  ? "500px"
                                  : props.isMobileLandscape
                                  ? "200px"
                                  : "",
                                overflow: "scroll",
                              }}
                            >
                              <div
                                style={{
                                  width: props.isMobile ? "100%" : "30%",
                                  textAlign: props.isMobile ? "center" : "",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "serif",
                                  }}
                                >
                                  Contact Us
                                </p>
                                <p>
                                  We'd love to hear from you! Whether you have a
                                  question, feedback, or just want to say hello,
                                  our team is here to help. By providing your
                                  details below, you enable us to connect with
                                  you directly and address your needs promptly.
                                </p>
                              </div>
                              {contacted ? (
                                <Typography
                                  id="modal-nodal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  Thank You! We have received your request. Our
                                  team will be in touch with you soon.
                                </Typography>
                              ) : contactError ? (
                                <Typography
                                  id="modal-nodal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  {" "}
                                  Sorry, We are currently facing some technical
                                  issues, Please try again later.{" "}
                                </Typography>
                              ) : (
                                <div
                                  style={{
                                    // width: "70%",
                                    fontSize: "0.8rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    width: props.isMobile ? "100%" : "60%",
                                    margin: "auto",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: props.isMobile
                                        ? "column"
                                        : "row",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: props.isMobile ? "100%" : "48%",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}
                                      >
                                        <p style={{ color: "red" }}>*</p>{" "}
                                        &nbsp;&nbsp;First Name
                                      </div>
                                      <div
                                        style={{
                                          border: "1px solid lightgray",
                                          height: "30px",
                                          borderRadius: "15px",
                                          paddingLeft: "3%",
                                          alignContent: "center",
                                        }}
                                      >
                                        <input
                                          style={{
                                            outline: "none",
                                            border: "none",
                                            width: "90%",
                                          }}
                                          placeholder="Enter First Name"
                                          id="firstName"
                                          value={firstName}
                                          onChange={(e) => {
                                            setFirstName(e.target.value);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: props.isMobile ? "100%" : "48%",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}
                                      >
                                        <p style={{ color: "red" }}>*</p>{" "}
                                        &nbsp;&nbsp;Last Name
                                      </div>
                                      <div
                                        style={{
                                          border: "1px solid lightgray",
                                          height: "30px",
                                          borderRadius: "15px",
                                          paddingLeft: "3%",
                                          alignContent: "center",
                                        }}
                                      >
                                        <input
                                          style={{
                                            outline: "none",
                                            border: "none",
                                            width: "90%",
                                          }}
                                          placeholder="Enter Last Name"
                                          id="lastName"
                                          value={lastName}
                                          onChange={(e) => {
                                            setLastName(e.target.value);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      width: "100%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p style={{ color: "red" }}>*</p>{" "}
                                      &nbsp;&nbsp;Email
                                    </div>
                                    <div
                                      style={{
                                        border: "1px solid lightgray",
                                        height: "30px",
                                        borderRadius: "15px",
                                        paddingLeft: "1.5%",
                                        alignContent: "center",
                                      }}
                                    >
                                      <input
                                        style={{
                                          outline: "none",
                                          border: "none",
                                          width: "90%",
                                        }}
                                        placeholder="Enter Email"
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                          setEmail(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <br />
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      width: "100%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p>&nbsp;</p>
                                      {/* <p style={{ color: "red" }}>*</p>{" "} */}
                                      &nbsp;&nbsp;Comments
                                    </div>
                                    <div
                                      style={{
                                        border: "1px solid lightgray",
                                        height: "30px",
                                        borderRadius: "15px",
                                        padding: "1.5%",
                                        // alignContent: "center",
                                        width: "98%",
                                        resize: "none",
                                        minHeight: "100px",
                                      }}
                                    >
                                      <textarea
                                        style={{
                                          outline: "none",
                                          border: "none",
                                          width: "90%",
                                          resize: "none",
                                        }}
                                        placeholder="Please Leave A Message"
                                        id="comments"
                                        value={comments}
                                        onChange={(e) => {
                                          setComments(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <button
                                    style={{
                                      color: "white",
                                      backgroundColor: "rgb(31,165,141,1)",
                                      width: "200px",
                                      height: "50px",
                                      borderRadius: "25px",
                                      border: "none",
                                      marginTop: "5%",
                                      fontSize: "1.1rem",
                                      cursor: "pointer",
                                    }}
                                    onClick={(e) => {
                                      handleContact();
                                    }}
                                  >
                                    Contact Us
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          {/* <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Text in a modal
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                      </Typography> */}
                        </Box>
                      </Modal>
                      <div>
                        <p
                          id="description"
                          style={{ color: "#4E4E4E", fontSize: "0.9rem" }}
                        >
                          {data.description}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Container>
            )}
            {/* <div
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
            </div> */}
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: "2%",
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
            </div> */}

            {/* <div className="center" style={{ marginBottom: "2%" }}>
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
            </div> */}
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
