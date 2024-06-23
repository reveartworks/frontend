import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import bgImage from "../Images/backgroundImg.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";
import { Image } from "./image";

import { Header } from "../Component/Header";

import Stages from "../Component/Stages";
import { Footer } from "../Component/Footer";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { apiRequest } from "../Util/axiosInstance";
import Loading from "../Component/Loading";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

export function ListArt(props) {
  const openArtPage = () => {
    window.location.href = "/viewartlist";
  };
  var imageList = [];
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

  const [sortByLabel, setSortByLabel] = useState("None");
  const [hasMore, setHasMore] = useState(false);
  const [lastId, setLastId] = useState("none");
  const [sortByOrder, setSortByOrder] = useState("none");
  const [anchorSortEl, setAnchorSortEl] = useState(null);
  const [showRating, setShowRating] = useState(true);
  const [cover, setCover] = useState(true);
  const openSort = Boolean(anchorSortEl);
  //   const getSortedList = async (e, order) => {
  //     setShowRating(false);
  //     try {
  //       //   setLoading(true);
  //       const result = await apiRequest(
  //         "GET",
  //         "/documentsSorted/active/" + order + "/" + lastId
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

  const sortImages = (key, order = "asc") => {
    setShowRating(false);
    if (key == "none") {
      setImages(initialImages);
    } else {
      const sortedData = [...images].sort((a, b) => {
        if (key == "name") {
          var nameA = a[key].toLowerCase();
          var nameB = b[key].toLowerCase();
        }
        if (key == "rating") {
          var nameA = a[key];
          var nameB = b[key];
        }

        if (order === "asc") {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
      });

      setImages(sortedData);
      setAnchorSortEl(null);
    }
    setTimeout(() => {
      setShowRating(true);
    }, 1000);
  };

  const getMoreList = async (e, last_id) => {
    setShowRating(false);
    try {
      //   setLoading(true);
      //   if (sortByOrder != "none")
      //     var result = await apiRequest(
      //       "GET",
      //       "/documentsSorted/active/" + sortByOrder + "/" + last_id
      //     );
      //   else
      const result = await apiRequest("GET", "/documents/active/" + last_id);
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
      setSortByLabel("None");
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      var user = "user";
      if (sessionStorage.loggedIn == "true") {
        user = "admin";
      }
      const metricsResult = await apiRequest(
        "GET",
        "/capturViewAllArtPageVisits/" +
          user +
          "/" +
          sessionStorage.getItem("artSessionId")
      ); // Replace with your API endpoint
      console.log(metricsResult);
      try {
        const result = await apiRequest("GET", "/documents/active/" + lastId); // Replace with your API endpoint
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
        setSortByLabel("None");
        setSortByOrder("none");
        setShowRating(true);
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
            backgroundRepeat: "no-repeat",
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
            {!props.isMobile ? (
              <div>
                <div>
                  <Stages
                    stage="artwork"
                    isMobile={props.isMobile}
                    isMobileLandscape={props.isMobileLandscape}
                  ></Stages>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: props.isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    // marginLeft: "1%",
                    marginRight: "3%",
                    alignItems: props.isMobile ? "center" : "baseline",
                    marginBottom: props.isMobile ? "8%" : "",
                  }}
                >
                  <div style={{ marginTop: props.isMobile ? "-5%" : "-1%" }}>
                    <p
                      className=""
                      style={{
                        fontSize: props.isMobile
                          ? "1.5rem"
                          : props.isMobileLandscape
                          ? "1.5rem"
                          : "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      Artworks{" "}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ marginTop: "-2%" }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Cover</Typography>
                        <Switch
                          defaultChecked
                          // size="small"
                          onChange={(e) => {
                            setCover(!cover);
                          }}
                          style={{
                            color: "rgba(31, 165, 141, 1)",
                          }}
                        />
                      </Stack>
                      {/* <FormGroup>
                        <FormControlLabel

                          control={ */}
                      {/* } */}
                      {/* label="Cover"
                        /> */}
                      {/* </FormGroup> */}
                    </div>
                    <div style={{ width: "150px", textAlign: "center" }}>
                      Sort by:
                    </div>
                    <div
                      style={{
                        marginRight: "5%",
                      }}
                    >
                      <button
                        id="demo-positioned-button"
                        aria-controls={
                          openSort ? "demo-positioned-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openSort ? "true" : undefined}
                        onClick={handleSortClick}
                        style={{
                          color: "rgb(31,165,141,1)",
                          backgroundColor: "white",
                          width: "200px",
                          height: "30px",
                          borderRadius: "15px",
                          fontSize: "1.1rem",
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
                            setSortByLabel("None");
                            setSortByOrder("none");
                            // getSortedList(e, "none");
                            // setImages(tempImages);
                            sortImages("none");
                          }}
                        >
                          None
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            setSortByLabel("A to Z");
                            setSortByOrder("nameAsc");
                            // getSortedList(e, "nameAsc");
                            sortImages("name", "asc");
                          }}
                        >
                          A to Z
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            setSortByLabel("Z to A");
                            setSortByOrder("nameDesc");
                            // getSortedList(e, "nameDesc");
                            sortImages("name", "desc");
                          }}
                        >
                          Z to A
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            setSortByLabel("Rating: High to Low");
                            setSortByOrder("ratingDesc");
                            // getSortedList(e, "ratingDesc");
                            sortImages("rating", "desc");
                          }}
                        >
                          Rating: High to Low
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            setSortByLabel("Rating: Low to High");
                            setSortByOrder("ratingAsc");
                            // getSortedList(e, "ratingAsc");
                            sortImages("rating", "asc");
                          }}
                        >
                          Rating: Low to High
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  marginBottom: "5%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ minWidth: "35%" }}>
                  <Stages
                    stage="artwork"
                    isMobile={props.isMobile}
                    isMobileLandscape={props.isMobileLandscape}
                  ></Stages>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "right",
                    fontSize: "0.8rem",
                    marginTop: "1%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ width: "80px", textAlign: "center" }}>
                        Sort by:
                      </div>
                      <div
                        style={{
                          marginRight: "5%",
                        }}
                      >
                        <button
                          id="demo-positioned-button"
                          onClick={handleSortClick}
                          style={{
                            color: "rgb(31,165,141,1)",
                            backgroundColor: "white",
                            width: "130px",
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
                              setSortByLabel("None");
                              setSortByOrder("none");
                              // getSortedList(e, "none");
                              // setImages(tempImages);
                              sortImages("none");
                            }}
                          >
                            None
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setSortByLabel("A to Z");
                              setSortByOrder("nameAsc");
                              // getSortedList(e, "nameAsc");
                              sortImages("name", "asc");
                            }}
                          >
                            A to Z
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setSortByLabel("Z to A");
                              setSortByOrder("nameDesc");
                              // getSortedList(e, "nameDesc");
                              sortImages("name", "desc");
                            }}
                          >
                            Z to A
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setSortByLabel("Rating: High to Low");
                              setSortByOrder("ratingDesc");
                              // getSortedList(e, "ratingDesc");
                              sortImages("rating", "desc");
                            }}
                          >
                            Rating: High to Low
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setSortByLabel("Rating: Low to High");
                              setSortByOrder("ratingAsc");
                              // getSortedList(e, "ratingAsc");
                              sortImages("rating", "asc");
                            }}
                          >
                            Rating: Low to High
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {props.isMobile ? (
              <div
                style={{
                  // marginTop: "-1.3%",
                  // paddingLeft: "5%",
                  margin: "auto",
                  marginBottom: "5%",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography style={{ fontSize: "0.8rem" }}>Cover</Typography>
                  <Switch
                    defaultChecked
                    size="small"
                    onChange={(e) => {
                      setCover(!cover);
                    }}
                    style={{
                      color: "rgba(31, 165, 141, 1)",
                    }}
                  />
                </Stack>
              </div>
            ) : null}
            {loading ? (
              <div style={{ height: "100vh" }}>
                <Loading
                  isMobile={props.isMobile}
                  isMobileLandscape={props.isMobileLandscape}
                />
              </div>
            ) : null}
            {/* <Loading
              isMobile={props.isMobile}
              isMobileLandscape={props.isMobileLandscape}
            /> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: "-1%",
                justifyContent:
                  props.isMobile || props.isMobileLandscape
                    ? "space-evenly"
                    : "",
              }}
            >
              {images.length > 0
                ? images.map((item) => (
                    // try{

                    <div
                      style={{
                        marginBottom: "2%",
                        marginRight: "2%",
                        backgroundColor: "white",
                      }}
                    >
                      <Link
                        to={"/artDetails/" + item._id["$oid"]}
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
                            backgroundSize: cover ? "cover" : "contain",
                            backgroundRepeat: "no-repeat",
                            marginLeft: props.isMobile ? "0%" : "",
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
                          <div>{showRating ? item.name : "Loading..."}</div>
                          <div>
                            {showRating ? (
                              <Stack spacing={1}>
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={item.rating ? item.rating : 0}
                                  precision={0.5}
                                  readOnly
                                />
                              </Stack>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    </div>
                    // }catch(e){}
                  ))
                : null}
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
