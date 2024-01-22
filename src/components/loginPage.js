import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../CSS/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      // console.log(mail, password, port);
      // let passObj = {
      //   mail: "mail",
      //   password: "passowrd",
      // };
      // await axios
      //   .post(`${port}/login`, passObj)
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => console.log(err));
      navigate("/fileArea/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginSection">
      <Box id="loginBox">
        <div className="heading">Login</div>
        <div className="mailSection">
          <input
            type="text"
            id="mailText"
            placeholder="Email"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
        </div>
        <div className="passwordSection">
          <input
            type="password"
            id="passwordText"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="submitSection">
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </div>
        <div className="registerSection">
          <span className="accText" onClick={() => {}}>
            Don't have an account?Create a new One
          </span>
        </div>
      </Box>
    </div>
  );
}
