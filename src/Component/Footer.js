import { Button, Container, Grid, List, ListItem, Paper } from "@mui/material";
import logoFooter from "../Images/logoFooter.png";
import footerLogo from "../Images/headerLogo.png";
import * as React from "react";
import xLogo from "../Images/x.png";
import fbLogo from "../Images/fb.png";
import instaLogo from "../Images/insta.png";
import { Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import contactLogo from "../Images/contactLogo0.png";
import { useState, useEffect } from "react";
import { apiRequest } from "../Util/axiosInstance";

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
export function Footer(props) {
  const [footerContactOpen, setFooterContactOpen] = React.useState(false);
  const handleFooterContactOpen = () => setFooterContactOpen(true);
  const handleFooterContactClose = () => setFooterContactOpen(false);
  const [firstNameFooter, setFirstNameFooter] = useState("");
  const [lastNameFooter, setLastNameFooter] = useState("");
  const [emailFooter, setEmailFooter] = useState("");
  const [commentsFooter, setCommentsFooter] = useState("");
  const [contactedFooter, setContactedFooter] = useState(false);
  const [contactErrorFooter, setContactErrorFooter] = useState(false);

  function alerter(field) {
    alert("Please provide your " + field);
  }
  function handleContactFooter() {
    try {
      if (!firstNameFooter) {
        alerter("First Name");
        return;
      }
      if (!lastNameFooter) {
        alerter("Last Name");
        return;
      }
      if (!emailFooter) {
        alerter("Email");
        return;
      }
      if (!commentsFooter) {
        alerter("Comments");
        return;
      }
      var contactData = {
        firstName: firstNameFooter,
        lastName: lastNameFooter,
        email: emailFooter,
        comments: commentsFooter,
        sessionId: sessionStorage.getItem("artSessionId"),
      };
      try {
        const result = apiRequest("POST", "/contact", contactData); // Replace with your API endpoint
        // console.log(result);
      } catch (e) {
        setContactErrorFooter(true);
      }
      // console.log(typeof result);
      setContactedFooter(true);
    } catch (error) {
      setContactErrorFooter(true);
    }
  }
  return (
    <div className="footer" style={{ backgroundColor: "#074036" }}>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "5%",
            paddingBottom: "3%",
          }}
        >
          <div style={{ maxWidth: "60%" }}>
            <Link to="/">
              <img src={footerLogo} />
            </Link>
            <p
              className="text17"
              style={{
                fontSize: "2rem",
                marginBotton: "0px",
                marginTop: "0",
              }}
            >
              Let's Talk
            </p>
            <p className="text17" style={{ marginTop: "-5%" }}>
              We’d love to hear your thoughts. Perhaps we can create something
              unique just for you and bring some joy to your space.
            </p>
            <Button
              className="contact"
              variant="outlined"
              id="footerContactButton"
              style={{
                color: "black",
                border: "1px solid white",
                borderRadius: "20px",
                textTransform: "capitalize",
              }}
              onClick={handleFooterContactOpen}
            >
              Contact Us
            </Button>
          </div>
          <div style={{ width: "40%", alignContent: "end", marginLeft: "20%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: props.isMobile ? "column" : "row",
                justifyContent: "space-around",
              }}
            >
              <div style={{ paddingTop: props.isMobile ? "" : "7px" }}>
                <img src={fbLogo} />
              </div>
              <div>
                <a
                  href="https://www.instagram.com/reveartworks/"
                  target="_blank" //x.com/reveartworks
                >
                  <img
                    src={instaLogo}
                    style={{ marginLeft: props.isMobile ? "-10%" : "" }}
                  />
                </a>
              </div>
              <div style={{ paddingTop: props.isMobile ? "" : "7px" }}>
                <a href="https://x.com/reveartworks" target="_blank">
                  <img src={xLogo} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>&nbsp;</div>
        <Modal
          open={footerContactOpen}
          onClose={handleFooterContactClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div style={{ display: "flex", flexDirection: "column" }}>
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
                    onClick={handleFooterContactClose}
                  />
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: props.isMobile ? "column" : "row",
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
                    We'd love to hear from you! Whether you have a question,
                    feedback, or just want to say hello, our team is here to
                    help. By providing your details below, you enable us to
                    connect with you directly and address your needs promptly.
                  </p>
                </div>
                {contactedFooter ? (
                  <Typography
                    id="modal-nodal-title"
                    variant="h6"
                    component="h2"
                  >
                    Thank You! We have received your request. Our team will be
                    in touch with you soon.
                  </Typography>
                ) : contactErrorFooter ? (
                  <Typography
                    id="modal-nodal-title"
                    variant="h6"
                    component="h2"
                  >
                    {" "}
                    Sorry, We are currently facing some technical issues, Please
                    try again later.{" "}
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
                        flexDirection: props.isMobile ? "column" : "row",
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
                          <p style={{ color: "red" }}>*</p> &nbsp;&nbsp;First
                          Name
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
                            value={firstNameFooter}
                            onChange={(e) => {
                              setFirstNameFooter(e.target.value);
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
                          <p style={{ color: "red" }}>*</p> &nbsp;&nbsp;Last
                          Name
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
                            value={lastNameFooter}
                            onChange={(e) => {
                              setLastNameFooter(e.target.value);
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
                        <p style={{ color: "red" }}>*</p> &nbsp;&nbsp;Email
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
                          value={emailFooter}
                          onChange={(e) => {
                            setEmailFooter(e.target.value);
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
                          value={commentsFooter}
                          onChange={(e) => {
                            setCommentsFooter(e.target.value);
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
                        handleContactFooter();
                      }}
                    >
                      Contact Us
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Box>
        </Modal>
      </Container>
    </div>
  );
}
