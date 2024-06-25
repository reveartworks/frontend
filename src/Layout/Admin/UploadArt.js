import { Button, Container, FormControl, TextField } from "@mui/material";
// import Textarea from "@mui/joy/Textarea";

import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import "swiper/css";
import "swiper/css/pagination";

import bgImage from "../../Images/backgroundLogo.png";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Image } from "../image";
import uploadImageIcon from "../../Images/uploadImage.jpeg";

import { Header } from "../../Component/Header";

import { apiRequest } from "../../Util/axiosInstance";
import { PropaneSharp } from "@mui/icons-material";
import Loading from "../../Component/Loading";
import compress from "compress-base64";
import imageCompression from "browser-image-compression";

export function UploadArt(props) {
  //   console.log("upload props");
  //   console.log(props);
  const imageId = useParams().id;
  if (
    sessionStorage.getItem("loggedIn") == "false" ||
    !sessionStorage.getItem("loggedIn")
  ) {
    window.location.href = "/adminlogin";
  }

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [image5, setImage5] = useState();

  const [updateArtwork, setUpdateArtwork] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [active, setActive] = useState(true);
  const [artworkName, setArtworkName] = useState("");
  const [rating, setRating] = useState();

  const [description, setDescription] = useState("");
  const [inCorousel, setInCorousel] = useState(true);
  const [inHomeGrid, setInHomeGrid] = useState(true);
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  function alerter(field) {
    if (field == "Main Image") {
      alert("Please Upload an Image for Primary Artwork.");
      return;
    }
    alert("Please Provide Artwork " + field + ".");
  }
  async function handleUpload() {
    var data = {};
    data["images"] = [image1, image2, image3, image4, image5];

    if (!image1) {
      alerter("Main Image");
      return;
    }
    if (!artworkName) {
      alerter("Name");
      return;
    }
    if (!rating) {
      alerter("Rating");
      return;
    }
    if (!height) {
      alerter("Height");
      return;
    }
    if (!width) {
      alerter("Width");
      return;
    }
    if (!description) {
      alerter("Description");
      return;
    }

    data.active = active;
    data.name = artworkName;
    data.rating = rating;
    data.height = height;
    data.width = width;
    data.inCorousel = inCorousel;
    data.inHomeGrid = inHomeGrid;
    data.description = description;
    // console.log(data);

    try {
      setUploading(true);
      const result = await apiRequest("POST", "/add", data); // Replace with your API endpoint
      // setData(result);
      // console.log();
      alert("Artwork Uploaded Successfully!");
      //   window.location.href("/dashboard");
      window.location.href = "/dashboard";
    } catch (error) {
      //   console.error("Failed to fetch data:", error);
      alert("Artwork Upload Failed, Please try again later.");
    } finally {
      setUploading(false);
      // alert("uploaded ")
    }
  }
  async function handleUpdate() {
    var data = {};
    data["images"] = [image1, image2, image3, image4, image5];

    if (!image1) {
      alerter("Main Image");
      return;
    }
    if (!artworkName) {
      alerter("Name");
      return;
    }
    if (!rating) {
      alerter("Rating");
      return;
    }
    if (!height) {
      alerter("Height");
      return;
    }
    if (!width) {
      alerter("Width");
      return;
    }
    if (!description) {
      alerter("Description");
      return;
    }

    data.active = active;
    data.name = artworkName;
    data.rating = rating;
    data.height = height;
    data.width = width;
    data.inCorousel = inCorousel;
    data.inHomeGrid = inHomeGrid;
    data.description = description;
    // console.log(data);

    try {
      setUploading(true);
      const result = await apiRequest("PUT", "/document/" + imageId, data); // Replace with your API endpoint
      // setData(result);
      // console.log();
      alert("Artwork Updated Successfully!");
      //   window.location.href("/dashboard");
      window.location.href = "/dashboard";
    } catch (error) {
      //   console.error("Failed to fetch data:", error);
      alert("Artwork Update Failed, Please try again later.");
    } finally {
      // setLoading(false);
      // alert("uploaded ")
      setUploading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (imageId != "new") {
        try {
          const result = await apiRequest("GET", "/document/" + imageId); // Replace with your API endpoint
          setActive(result.active ? result.active : false);
          setArtworkName(result.name ? result.name : "");
          setRating(result.rating ? parseFloat(result.rating) : 0);
          setDescription(result.description ? result.description : "");
          setInCorousel(result.inCorousel ? result.inCorousel : false);
          setInHomeGrid(result.inHomeGrid ? result.inHomeGrid : false);
          setHeight(result.height ? parseFloat(result.height) : 0);
          setWidth(result.width ? parseFloat(result.width) : 0);
          setImage1(JSON.parse(result.image1).image);
          setImage2(JSON.parse(result.image2).image);
          setImage3(JSON.parse(result.image3).image);
          setImage4(JSON.parse(result.image4).image);
          setImage5(JSON.parse(result.image5).image);
          // console.log(result.image1);
          setUpdateArtwork(true);
          setImage(JSON.parse(result.image1).image);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [imageId]);

  async function handleFileChange(event, index) {
    // console.log(index);
    setUploading(true);
    const file = event.target.files[0];
    // console.log(file);
    if (file) {
      // Ensure the selected file is an image
      if (!file.type.startsWith("image/")) {
        //   setError("Please select a valid image file");
        //   setBase64(""); // Reset the base64 state
        return;
      }

      const imageFile = event.target.files[0];
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 2560,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);
        // console.log(
        //   "compressedFile instanceof Blob",
        //   compressedFile instanceof Blob
        // ); // true
        // console.log(
        //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        // ); // smaller than maxSizeMB

        // console.log(compressedFile); // write your own logic
        const reader = new FileReader();
        reader.onloadend = () => {
          if (index == 1) setImage1(reader.result); // Set the base64 string to the state
          if (index == 2) setImage2(reader.result); // Set the base64 string to the state
          if (index == 3) setImage3(reader.result); // Set the base64 string to the state
          if (index == 4) setImage4(reader.result); // Set the base64 string to the state
          if (index == 5) setImage5(reader.result); // Set the base64 string to the state
          setUploading(false);
        };
        reader.onerror = () => {
          //   setError("Failed to read file");
        };
        reader.readAsDataURL(compressedFile); // Read the file as a data URL
        // console.log(image1);
      } catch (error) {
        console.log(error);
        setUploading(false);
      }

      // setError(null); // Reset any previous error

      // Convert the image file to a base64 string
    }
  }

  const [image, setImage] = new useState(Image);
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
      <Header
        isMobile={props.isMobile}
        isMobileLandscape={props.isMobileLandscape}
      ></Header>
      <div>
        <div
          className="slide"
          style={{
            width: "100%",
            backgroundImage: image.startsWith("data:image")
              ? `url(${image})`
              : `url(${image})`,
            //   backgroundColor: "#cccccc",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: props.isMobile || props.isMobileLandscape ? "10vh" : "14vh",
          }}
        >
          {/* <img src={`data:image/png;base64,${image}`} /> */}&nbsp;
        </div>
      </div>
      <div style={{ backgroundImage: `url(${bgImage})` }}>
        {/* <Container fixed> */}
        <div style={{ width: "100%" }}>
          {loading ? (
            <Loading
              isMobile={props.isMobile}
              isMobileLandscape={props.isMobileLandscape}
            />
          ) : null}
        </div>
        <Container fixed style={{ height: "100vh" }}>
          <div
            style={{
              marginTop: "2%",
              width: "100%",
              borderRadius: "20px",
              //   border: "1px solid black",
              boxShadow: "0 0 15px 5px lightgray",
              //   height: "80vh",
              height: "fit-content",
              background: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "800",
                    color: "gray",
                    paddingTop: "10px",
                    paddingRight: "20px",
                    textAlign: "right",
                  }}
                >
                  X
                </div>
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: props.isMobile ? "column" : "row",
                width: "90%",
                margin: "auto",
                flexWrap: "wrap",
              }}
            >
              <div
                id="imageUploadSection"
                style={{
                  height: "100%",
                  width: "50%",
                  background: "",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "300px",
                  margin: "auto",
                  //   justifyContent: "center",
                }}
              >
                <div
                  style={{
                    height: props.isMobile ? "250px" : "300px",
                    width: props.isMobile ? "250px" : "400px",
                    minHeight: "100px",
                    minWidth: "100px",
                    margin: "auto",
                    backgroundImage: image1
                      ? `url(${image1})`
                      : `url(${uploadImageIcon})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "20px",
                  }}
                  onClick={(e) => {
                    document.getElementById("image1upload").click();
                  }}
                >
                  <input
                    type="file"
                    name="image1"
                    accept="image/png, image/jpeg"
                    id="image1upload"
                    onChange={(e) => {
                      handleFileChange(e, 1);
                    }}
                    hidden
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: props.isMobile
                      ? "space-evenly"
                      : "space-around",
                    // marginTop: "5%",
                    flexWrap: "wrap",
                    // alignItems: "center",
                    // margin: "auto",
                  }}
                >
                  <div
                    style={{
                      height: props.isMobile ? "80px" : "100px",
                      width: props.isMobile ? "80px" : "100px",
                      marginRight: props.isMobile ? "" : "5%",
                      marginTop: "5%",
                      //   margin: "auto",
                      backgroundImage: image2
                        ? `url(${image2})`
                        : `url(${uploadImageIcon})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "10px",
                    }}
                    onClick={(e) => {
                      document.getElementById("image2upload").click();
                    }}
                  >
                    <input
                      type="file"
                      name="image2"
                      accept="image/png, image/jpeg"
                      id="image2upload"
                      hidden
                      onChange={(e) => {
                        handleFileChange(e, 2);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      height: props.isMobile ? "80px" : "100px",
                      width: props.isMobile ? "80px" : "100px",
                      //   margin: "auto",
                      //   marginRight: "5%",
                      marginTop: "5%",
                      backgroundImage: image3
                        ? `url(${image3})`
                        : `url(${uploadImageIcon})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "10px",
                    }}
                    onClick={(e) => {
                      document.getElementById("image3upload").click();
                    }}
                  >
                    <input
                      type="file"
                      name="image1"
                      accept="image/png, image/jpeg"
                      id="image3upload"
                      hidden
                      onChange={(e) => {
                        handleFileChange(e, 3);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      height: props.isMobile ? "80px" : "100px",
                      width: props.isMobile ? "80px" : "100px",
                      //   margin: "auto",
                      //   marginRight: "5%",
                      marginTop: "5%",
                      backgroundImage: image4
                        ? `url(${image4})`
                        : `url(${uploadImageIcon})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "10px",
                    }}
                    onClick={(e) => {
                      document.getElementById("image4upload").click();
                    }}
                  >
                    <input
                      type="file"
                      name="image1"
                      accept="image/png, image/jpeg"
                      id="image4upload"
                      hidden
                      onChange={(e) => {
                        handleFileChange(e, 4);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      height: props.isMobile ? "80px" : "100px",
                      width: props.isMobile ? "80px" : "100px",
                      marginTop: "5%",
                      //   margin: "auto",
                      backgroundImage: image5
                        ? `url(${image5})`
                        : `url(${uploadImageIcon})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "10px",
                      //   marginRight: "5%",
                    }}
                    onClick={(e) => {
                      document.getElementById("image5upload").click();
                    }}
                  >
                    <input
                      type="file"
                      name="image1"
                      accept="image/png, image/jpeg"
                      id="image5upload"
                      hidden
                      onChange={(e) => {
                        handleFileChange(e, 5);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                id="imageDetailsSections"
                style={{
                  height: "100%",
                  width: props.isMobile ? "100%" : "50%",
                  background: "",
                  margin: "auto",
                }}
              >
                <Container>
                  <p className="bold">Artwork Details</p>

                  <FormControl required fullWidth>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={active}
                          onChange={(e) => {
                            setActive(e.target.checked);
                          }}
                        />
                      }
                      label="Active"
                    />
                  </FormControl>
                  <FormControl required fullWidth>
                    <TextField
                      name="Name"
                      value={artworkName}
                      onInput={(e) => {
                        setArtworkName(e.target.value);
                      }}
                      label="Name"
                      type="text"
                    />
                  </FormControl>
                  <br />
                  <br />
                  <FormControl required fullWidth>
                    <TextField
                      name="rating"
                      value={rating || ""}
                      onInput={(e) => {
                        setRating(e.target.value);
                      }}
                      label="Rating"
                      type="number"
                    />
                  </FormControl>
                  <br />
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      margin: "auto",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>
                      <FormControl required fullWidth>
                        <TextField
                          name="verificationCode"
                          //   value={}
                          //   onInput={}
                          value={height || ""}
                          onInput={(e) => {
                            setHeight(e.target.value);
                          }}
                          label="Height (ft)"
                          type="number"
                        />
                      </FormControl>
                    </div>
                    <div>
                      {" "}
                      <FormControl required fullWidth>
                        <TextField
                          name="verificationCode"
                          //   value={}
                          //   onInput={}
                          value={width || ""}
                          onInput={(e) => {
                            setWidth(e.target.value);
                          }}
                          label="Width (ft)"
                          type="number"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      margin: "auto",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>
                      <FormControl required fullWidth>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={inCorousel}
                              onChange={(e) => {
                                setInCorousel(e.target.checked);
                              }}
                            />
                          }
                          label="Show in Corousel"
                        />
                      </FormControl>
                    </div>
                    <div>
                      {" "}
                      <FormControl required fullWidth>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={inHomeGrid}
                              onChange={(e) => {
                                setInHomeGrid(e.target.checked);
                              }}
                            />
                          }
                          label="Show on Home Grid"
                        />
                      </FormControl>
                    </div>
                  </div>
                  {/* <br />
                  <br /> */}

                  <FormControl required fullWidth>
                    {/* <Textarea
                      name="verificationCode"
                      //   value={}
                      //   onInput={}
                      //   label="Verification Code"
                      //   type="text"
                    /> */}
                    <p>Description:</p>
                    <textarea
                      //   height="100px"
                      style={{
                        height: "100px",
                        maxHeight: "100px",
                        maxWidth: "100%",
                        border: "2px solid #e2e2e2",
                        borderRadius: "5px",
                      }}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      //   value = {}
                    ></textarea>
                  </FormControl>
                  <br />
                  <br />
                  {!updateArtwork ? (
                    <FormControl required fullWidth>
                      {uploading ? (
                        <Loading
                          isMobile={props.isMobile}
                          isMobileLandscape={props.isMobileLandscape}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          onClick={(e) => {
                            handleUpload();
                          }}
                          color="primary"
                        >
                          Upload Artwork
                        </Button>
                      )}
                      <br></br>
                      <br></br>
                      <br></br>
                    </FormControl>
                  ) : (
                    <FormControl required fullWidth>
                      {uploading ? (
                        <Loading
                          uploadPage={true}
                          // isMobile={props.isMobile}
                          // isMobileLandscape={props.isMobileLandscape}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          onClick={(e) => {
                            handleUpdate();
                          }}
                          color="primary"
                        >
                          Update Artwork
                        </Button>
                      )}
                      <br></br>
                      <br></br>
                      <br></br>
                    </FormControl>
                  )}
                </Container>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}
