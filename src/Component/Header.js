import { Container, Grid } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logoFooter from "../Images/logoFooter.png";
import headerLogo from "../Images/headerLogo.png";
import * as React from "react";
import Button from "@mui/material/Button";
import burger from "../Images/burger.png";
import "../App.css";
// import useWindowSize from "../Util/useWindowSize";

function generateRandomSessionId(length = 32) {
  // Characters that can be used in the session ID
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  // Create an array to hold the random values
  const randomValues = new Uint8Array(length);

  // Fill the array with random values
  window.crypto.getRandomValues(randomValues);

  // Convert the random values to characters from the `characters` set
  let sessionId = "";
  for (let i = 0; i < length; i++) {
    sessionId += characters[randomValues[i] % charactersLength];
  }

  return sessionId;
}
export function Header(props) {
  if (!sessionStorage.getItem("artSessionId")) {
    sessionStorage.setItem("artSessionId", generateRandomSessionId());
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (sessionStorage.getItem("loggedIn") == "true") {
      setUserLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <Container>
        <div
          //   className="header"
          style={{
            position: "absolute",
            zIndex: "5",
            width: "100%",
            marginTop: props.isMobileLandscape
              ? "1%"
              : props.isMobile
              ? "3%"
              : "1%",
            marginLeft:
              props.isMobileLandscape || props.isMobile ? "-1%" : "-8%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">
            <img
              src={headerLogo}
              style={{
                height: props.isMobileLandscape
                  ? "50%"
                  : props.isMobile
                  ? "70%"
                  : "90%",
                marginTop: "-3%",
              }}
            />
          </Link>

          <div
            style={{
              marginRight: "5%",
            }}
          >
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <img
                src={burger}
                style={{
                  height: props.isMobileLandscape
                    ? "50%"
                    : props.isMobile
                    ? "80%"
                    : "100%",
                  marginTop: "20%",
                }}
              ></img>
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              style={{ marginLeft: props.isMobile ? "-5%" : "0" }}
            >
              <MenuItem
                onClick={(e) => {
                  window.location.href = "/";
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  window.location.href = "/viewartlist";
                }}
              >
                Gallery
              </MenuItem>
              {/* {!userLoggedIn ? (
                <MenuItem
                  onClick={(e) => {
                    window.location.href = "/adminlogin";
                  }}
                >
                  Admin Login
                </MenuItem>
              ) : null} */}
              {!userLoggedIn ? (
                <MenuItem
                  onClick={(e) => {
                    document.getElementById("footerContactButton").click();
                  }}
                >
                  Contact Us
                </MenuItem>
              ) : null}
              {userLoggedIn ? (
                <MenuItem
                  onClick={(e) => {
                    window.location.href = "/dashboard";
                  }}
                >
                  Admin Dashboard
                </MenuItem>
              ) : null}
              {userLoggedIn ? (
                <MenuItem
                  onClick={(e) => {
                    window.location.href = "/purchaseEnquiries";
                  }}
                >
                  Purchase Enquiries
                </MenuItem>
              ) : null}
              {userLoggedIn ? (
                <MenuItem
                  onClick={(e) => {
                    window.location.href = "/contactEnquiries";
                  }}
                >
                  Contact Enquiries
                </MenuItem>
              ) : null}
              {userLoggedIn ? (
                <MenuItem
                  onClick={(e) => {
                    window.location.href = "/analytics";
                  }}
                >
                  Site Analytics
                </MenuItem>
              ) : null}
              {userLoggedIn ? (
                <MenuItem
                  onClick={(e) => {
                    sessionStorage.setItem("loggedIn", false);
                    setUserLoggedIn(false);
                    window.location.href = "/";
                  }}
                >
                  Logout
                </MenuItem>
              ) : null}
            </Menu>
          </div>
        </div>
      </Container>
    </div>
  );
}
