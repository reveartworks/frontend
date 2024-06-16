import {
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Header } from "../../Component/Header";
import contactLogo from "../../Images/contactLogo.png";
import { apiRequest } from "../../Util/axiosInstance";

export function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  //   const [userDetails, setUserDetails] = useState({
  //     email: "",
  //     password: "",
  //   });
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [verificaitonCode, setVerificaitonCode] = useState();

  const handleInput = (event) => {
    // setUserDetails({
    //   ...userDetails,
    //   [event.target.name]: event.target.value,
    // });
  };

  const handleSubmit = async () => {
    try {
      const result = await apiRequest("POST", "/userAuth", {
        email: email,
        password: password,
      }); // Replace with your API endpoint
      //   console.log(result);
      setLoggedIn(true);
      sessionStorage.setItem("loggedIn", true);
      window.location.href = "/dashboard";
    } catch (error) {
      //   console.error("Failed to authenticate:", error);
      setLoginError(true);
    }
  };
  const handleForgotPassword = async () => {
    try {
      const result = await apiRequest("GET", "/forgotPassword"); // Replace with your API endpoint
      console.log(result);
      //   setLoggedIn(true);
      //   localStorage.setItem("loggedIn", true);
      //   window.location.href = "/dashboard";

      setForgotPassword(true);
      setLoggedIn(false);
    } catch (error) {
      //   console.error("Failed to authenticate:", error);
      //   setError(true);
      alert("Password Reset Service is Down, Please Try again Later.");
    }
  };
  const resetPassword = async () => {
    if (password1 != password2) {
      setPasswordMatchError(true);
      return;
    }

    try {
      const result = await apiRequest("PUT", "/updatePassword", {
        verificationCode: verificaitonCode,
        password: password1,
      }); // Replace with your API endpoint
      setLoggedIn(true);
      sessionStorage.setItem("loggedIn", true);
      window.location.href = "/dashboard";
    } catch (error) {
      setVerificationCodeError(true);
      setPasswordMatchError(false);
    }
  };

  if (!loggedIn && !forgotPassword) {
    return (
      <>
        {/* <ToolBar /> */}
        <Header />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Container>
          <img
            src={contactLogo}
            onClick={(e) => {
              window.location.href = "/";
            }}
          />
          <p className="bold">Login your account</p>
          <FormControl required fullWidth>
            {loginError ? (
              <p style={{ color: "red" }}>Invalid Username or password</p>
            ) : null}
            <TextField
              name="email"
              value={email}
              onInput={(e) => {
                setEmail(e.target.value);
              }}
              label="Email ID"
              type="email"
            />
          </FormControl>
          <br />
          <br />
          <FormControl required fullWidth>
            <TextField
              name="password"
              value={password}
              onInput={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              type="password"
            />
          </FormControl>
          <br />
          <br />
          <FormControl required fullWidth>
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Login
            </Button>
            <br></br>
            <button
              style={{ border: "none", background: "none", color: "blue" }}
              onClick={() => {
                handleForgotPassword();
              }}
            >
              {" "}
              Forgot Password?
            </button>
          </FormControl>
        </Container>
      </>
    );
  } else if (forgotPassword && !loggedIn) {
    return (
      <>
        {/* <ToolBar /> */}
        <Header />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Container>
          <img
            src={contactLogo}
            onClick={(e) => {
              window.location.href = "/";
            }}
          />
          <p className="bold">Login your account</p>
          <FormControl required fullWidth>
            {verificationCodeError ? (
              <p style={{ color: "red" }}>Invalid Verification Code</p>
            ) : null}

            <TextField
              name="verificationCode"
              value={verificaitonCode}
              onInput={(e) => {
                setVerificaitonCode(e.target.value);
              }}
              label="Verification Code (Sent To Admin's Email Address)"
              type="number"
            />
          </FormControl>
          <br />
          <br />
          <FormControl required fullWidth>
            <TextField
              name="password1"
              value={password1}
              onInput={(e) => {
                setPassword1(e.target.value);
              }}
              label="New Password"
              type="password"
            />
          </FormControl>
          <br />
          <br />
          <FormControl required fullWidth>
            <TextField
              name="password2"
              value={password2}
              onInput={(e) => {
                setPassword2(e.target.value);
              }}
              label="Re-Enter Password"
              type="password"
            />
          </FormControl>
          {passwordMatchError ? (
            <p style={{ color: "red" }}>Passwords do not match</p>
          ) : null}
          <br />
          <br />
          <FormControl required fullWidth>
            <Button
              variant="contained"
              onClick={(e) => {
                resetPassword();
              }}
              //   disabled={
              //     verificationCodeError || passwordMatchError ? true : false
              //   }
              color="primary"
            >
              Update Password
            </Button>
            <br></br>
          </FormControl>
        </Container>
      </>
    );
  }
}
