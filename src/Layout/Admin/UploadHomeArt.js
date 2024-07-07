import { Button, Container, FormControl, TextField } from "@mui/material";
// import Textarea from "@mui/joy/Textarea";

import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import bgImage from "../../Images/backgroundLogo.png";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import uploadImageIcon from "../../Images/uploadImage.jpeg";

import { apiRequest } from "../../Util/axiosInstance";
import Loading from "../../Component/Loading";
import imageCompression from "browser-image-compression";

export function UploadHomeArt(props) {
  // console.log("upload props");
  // console.log(props);
  const imageId = useParams().id;
  if (
    sessionStorage.getItem("loggedIn") == "false" ||
    !sessionStorage.getItem("loggedIn")
  ) {
    window.location.href = "/adminlogin";
  }

  const [image1, setImage1] = useState();

  const [updateArtwork, setUpdateArtwork] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [artworkName, setArtworkName] = useState("");
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  function alerter(field) {
    if (field == "Main Image") {
      alert("Please Upload an Image for Primary Artwork.");
      return;
    }
    alert("Please Provide Artwork " + field + ".");
  }

  // async function handleUpload() {
  //   var data = {};
  //   data["images"] = [image1, image2, image3, image4, image5];

  //   if (!image1) {
  //     alerter("Main Image");
  //     return;
  //   }
  //   if (!artworkName) {
  //     alerter("Name");
  //     return;
  //   }
  //   if (!rating) {
  //     alerter("Rating");
  //     return;
  //   }
  //   if (!height) {
  //     alerter("Height");
  //     return;
  //   }
  //   if (!width) {
  //     alerter("Width");
  //     return;
  //   }
  //   if (!description) {
  //     alerter("Description");
  //     return;
  //   }

  //   data.active = active;
  //   data.name = artworkName;
  //   data.rating = rating;
  //   data.height = height;
  //   data.width = width;
  //   data.inCorousel = inCorousel;
  //   data.inHomeGrid = inHomeGrid;
  //   data.description = description;
  //   data.nftUrl = artworkNfturl;
  //   // console.log(data);

  //   try {
  //     setUploading(true);
  //     const result = await apiRequest("POST", "/add", data);
  //     alert("Artwork Uploaded Successfully!");
  //     window.location.href = "/";
  //   } catch (error) {
  //     alert("Artwork Upload Failed, Please try again later.");
  //   } finally {
  //     setUploading(false);
  //   }
  // }

  async function handleUpdate() {
    var data = {};
    data["image"] = image1;

    if (!image1) {
      alerter("Main Image");
      return;
    }
    if (!artworkName) {
      alerter("Name");
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

    data.name = artworkName;
    data.height = height;
    data.width = width;

    try {
      setUploading(true);
      const result = await apiRequest(
        "POST",
        "/homeDocument/" + props.imageSection + "/" + props.imageIndex,
        data
      );
      alert("Artwork Updated Successfully!");
      window.location.href = "/";
    } catch (error) {
      alert("Artwork Update Failed, Please try again later.");
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        var result = await apiRequest(
          "GET",
          "/homeDocument/" + props.imageSection + "/" + props.imageIndex
        ); // Replace with your API endpoint

        console.log("edit home image result");
        console.log(result);
        result = result[0];
        console.log(result);
        console.log(result.name);
        setArtworkName(result.name ? result.name : "");
        setHeight(result.height ? parseFloat(result.height) : 0);
        setWidth(result.width ? parseFloat(result.width) : 0);
        setImage1(result.image);

        setUpdateArtwork(true);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
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
        return;
      }

      const imageFile = event.target.files[0];
      // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 2560,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (index == 1) setImage1(reader.result); // Set the base64 string to the state
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
    }
  }

  return (
    <div>
      {/* <ToolBar /> */}
      <div style={{ backgroundImage: `url(${bgImage})` }}>
        <div style={{ width: "100%" }}>
          {loading ? (
            <Loading
              isMobile={props.isMobile}
              isMobileLandscape={props.isMobileLandscape}
            />
          ) : null}
        </div>
        {!loading ? (
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
                marginBottom: "2%",
              }}
            >
              <div style={{ width: "100%" }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "800",
                      color: "gray",
                      paddingTop: "10px",
                      paddingRight: "20px",
                      textAlign: "right",
                    }}
                    onClick={props.handleClose}
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
                      marginBottom: "10%",
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
                            label="Height (inches)"
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
                            label="Width (inches)"
                            type="number"
                          />
                        </FormControl>
                      </div>
                    </div>

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
                              handleUpdate();
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
        ) : null}
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}
