import { Button, Container, Grid, List, ListItem, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Outlet, Link } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import bgImage from "../../Images/backgroundImg.svg";
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
export function Dashboard(props) {
  var imageList = [];
  //   alert(typeof localStorage.getItem("loggedIn"));
  if (
    sessionStorage.getItem("loggedIn") == "false" ||
    !sessionStorage.getItem("loggedIn")
  ) {
    window.location.href = "/adminlogin";
  }
  //   for (var i = 0; i < 10; i++) {
  //     imageList.push(Image);
  //   }

  const [image, setImage] = new useState(Image);
  const [images, setImages] = new useState(imageList);
  const [initialImages, setInitialImages] = new useState(imageList);

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

  const [loading, setLoading] = useState(true);

  const [sortByLabel, setSortByLabel] = useState("All");
  const [sortByOrder, setSortByOrder] = useState("all");
  const [anchorSortEl, setAnchorSortEl] = useState(null);
  const [showRating, setShowRating] = useState(true);
  const openSort = Boolean(anchorSortEl);
  //   const getSortedList = async (e, order) => {
  //     setShowRating(false);
  //     try {
  //       //   setLoading(true);
  //       const result = await apiRequest(
  //         "GET",
  //         "/documentsSorted/active/" + order
  //       );
  //       //   console.log(result);
  //       // console.log(typeof result);
  //       //   if (result) {
  //       setImages(result);
  //       setImage(JSON.parse(result[0].image1).image);
  //       setAnchorSortEl(null);
  //       setShowRating(true);
  //       //   setLoading(false);
  //       //   }
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const [hasMore, setHasMore] = useState(false);
  const [lastId, setLastId] = useState("none");

  const filterImages = (key) => {
    setShowRating(false);
    if (key == "none") {
      setImages(initialImages);
    } else {
      var filteredImages = [];
      for (var im in initialImages) {
        if (key == "active") {
          if (initialImages[im].active) {
            filteredImages.push(initialImages[im]);
          }
        } else {
          if (!initialImages[im].active) {
            filteredImages.push(initialImages[im]);
          }
        }
      }

      setImages(filteredImages);
    }
    setTimeout(() => {
      setShowRating(true);
      setAnchorSortEl(null);
    }, 1000);
  };
  const getMoreList = async (e, last_id) => {
    setShowRating(false);
    try {
      //   setLoading(true);
      const result = await apiRequest("GET", "/documents/all/" + last_id);
      //   console.log(result);
      // console.log(typeof result);
      //   if (result) {
      var tempImages = [];
      for (var image in initialImages) {
        tempImages.push(initialImages[image]);
      }
      for (var res in result) {
        tempImages.push(result[res]);
      }
      setHasMore(result[0]["hasMore"]);
      last_id = result[result.length - 1]["_id"]["$oid"];
      console.log(last_id);
      setLastId(last_id);
      console.log(tempImages);
      setImages(tempImages);
      setInitialImages(tempImages);
      //   setImage(JSON.parse(result[0].image1).image);
      setAnchorSortEl(null);
      setShowRating(true);
      setSortByLabel("All");
      //   setLoading(false);
      //   }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };
  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiRequest("GET", "/documents/all/none"); // Replace with your API endpoint
        // console.log(result);
        // console.log(typeof result);
        if (result.length > 0) {
          setHasMore(result[0]["hasMore"]);
          setLastId(result[result.length - 1]["_id"]["$oid"]);
          //   alert(result[result.length - 1]["_id"]["$oid"]);
        }
        setImages(result);
        setInitialImages(result);
        // setImage(JSON.parse(result[0].image1).image);
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
              marginLeft: props.isMobile ? "" : "2%",
              marginTop: "1%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: props.isMobile ? "3%" : "",
                marginRight: "3%",
                marginTop: props.isMobile ? "2%" : "",
                alignItems: props.isMobile ? "center" : "baseline",
                marginBottom: props.isMobile ? "8%" : "",
                fontSize: props.isMobile ? "0.8rem" : "",
              }}
            >
              <div
                style={{
                  marginTop: props.isMobile ? "-3%" : "-1%",
                  minWidth: props.isMobile ? "25%" : "",
                  paddingLeft: props.isMobile ? "5%" : "",
                }}
              >
                <p
                  className=""
                  style={{
                    fontSize: props.isMobile
                      ? "1rem"
                      : props.isMobileLandscape
                      ? "1.5rem"
                      : "2rem",
                    fontWeight: "bold",
                  }}
                >
                  Artworks{" "}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: props.isMobile ? "-2%" : "",
                }}
              >
                <div style={{ width: "150px", textAlign: "center" }}>
                  Filter by:
                </div>
                <div
                  style={{
                    marginRight: "5%",
                  }}
                >
                  <button
                    onClick={handleSortClick}
                    style={{
                      color: "rgb(31,165,141,1)",
                      backgroundColor: "white",
                      width: "150px",
                      height: "20px",
                      borderRadius: "10px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      border: "1px solid rgb(31,165,141,1)",
                      marginTop: "-2%",
                    }}
                  >
                    {/* <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "90%",
                        justifyContent: "space-around",
                        paddingTop: "2%",
                      }}
                    >
                      <div>{sortByLabel}</div>
                      <div style={{ marginTop: "-1%" }}>
                        <KeyboardArrowDownIcon fontSize="medium" />
                      </div>
                    </div> */}
                    {sortByLabel}
                  </button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorSortEl}
                    open={openSort}
                    onClose={handleSortClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem
                      onClick={(e) => {
                        setSortByLabel("All");
                        setSortByOrder("all");
                        // getSortedList(e, "all");
                        filterImages("none");
                      }}
                    >
                      All
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        setSortByLabel("Active");
                        setSortByOrder("active");
                        // getSortedList(e, "active");
                        filterImages("active");
                      }}
                    >
                      Active
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        setSortByLabel("Inactive");
                        setSortByOrder("inactive");
                        // getSortedList(e, "inactive");
                        filterImages("inactive");
                      }}
                    >
                      Inactive
                    </MenuItem>
                  </Menu>
                </div>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: "2%",
                justifyContent:
                  props.isMobile || props.isMobileLandscape
                    ? "space-evenly"
                    : "",
              }}
            >
              {!loading ? (
                <div style={{ marginBottom: "2%", marginRight: "2%" }}>
                  <Link
                    to="/edit/new"
                    style={{ textDecoration: "none", color: "gray" }}
                  >
                    {" "}
                    <div
                      style={{
                        height: props.isMobile ? "90vw" : "250px",
                        width: props.isMobile ? "90vw" : "250px",
                        borderRadius: "10px",
                        backgroundImage: `url(${addImageIcon})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        marginLeft: props.isMobile ? "1%" : "",
                      }}
                    >
                      &nbsp;
                      {/* <img
                      src={addImageIcon}
                      style={{
                        height: "250px",
                        width: "250px",
                        borderRadius: "10px",
                      }}
                    ></img> */}
                    </div>
                    <div style={{ textAlign: "center" }}>Add Artwork</div>
                  </Link>
                </div>
              ) : null}
              {images.map((item) => (
                <div
                  style={{
                    marginBottom: "2%",
                    marginRight: "2%",
                    backgroundColor: "white",
                  }}
                >
                  <Link
                    to={"/edit/" + item._id["$oid"]}
                    style={{ textDecoration: "none", color: "gray" }}
                  >
                    <div
                      //   src={`data:image/png;base64,${item}`}
                      style={{
                        height: props.isMobile ? "90vw" : "250px",
                        width: props.isMobile ? "90vw" : "250px",
                        borderRadius: "10px",
                        boxShadow: "0 0 15px 10px lightgray",
                        backgroundImage: `url(${
                          JSON.parse(item.image1).image
                        })`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        marginLeft: props.isMobile ? "1%" : "",
                      }}
                    >
                      &nbsp;
                    </div>
                    <div
                      style={{
                        marginLeft: "2%",
                        marginTop: "3%",
                        marginBottom: "3%",
                        textTransform: "capitalize",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: props.isMobile ? "center" : "start",
                      }}
                    >
                      <div>{item.name}</div>
                      <div>
                        {showRating ? (
                          <Stack spacing={1}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={parseFloat(item.rating)}
                              precision={0.5}
                              readOnly
                            />
                          </Stack>
                        ) : null}
                      </div>
                      <div>
                        {item.active ? (
                          <div
                            style={{
                              color: "rgb(31,165,141,1)",
                              height: "20px",
                              borderRadius: "10px",
                              border: "1px solid rgb(31,165,141,1)",
                              width: "60px",
                              paddingLeft: "5%",
                            }}
                          >
                            Active
                          </div>
                        ) : (
                          <div
                            style={{
                              color: "red",
                              height: "20px",
                              borderRadius: "10px",
                              border: "1px solid red",
                              width: "80px",
                              paddingLeft: "5%",
                            }}
                          >
                            Inactive
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div
              className="center"
              style={{
                marginBottom: "2%",
                display: hasMore ? "block" : "none",
              }}
            >
              <button
                //   variant="outlined"
                style={{
                  color: "black",
                  border: "1px solid black",
                  borderRadius: "20px",
                  height: "30px",
                  width: "100px",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                onClick={(e) => getMoreList(e, lastId)}
              >
                Show More
              </button>
            </div>
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
