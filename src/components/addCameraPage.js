import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "../CSS/register.css";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../fireBase";
import dayjs from "dayjs";
import blankProfile from "../images/blankProfile.jpg";
import axios from "axios";
import { renderhost } from "../nodeLink";
import { useDispatch, useSelector } from "react-redux";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { handleEmptyValues, themeObj } from "../commonFunctions";
import { funLoading } from "../reactRedux/action";
// import * as faceapi from "face-api.js";
// import {} from "../../public/models"
import "../SCSS/addCamPage.scss";

export default function AddCameraPage() {
  const [camName, setCamName] = useState("");
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const admin = window.localStorage.getItem("admin");
  const adminID = window.localStorage.getItem("adminID");
  const [camAdd, setCamAdd] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlay, setVideoPlay] = useState("");
  const [showData, setShowData] = useState([]);

  const handleAddCam = async () => {
    try {
      console.log(camName, ip, port, userName, password);
      //cam name : "rtsp://ipadresss:username@password:port/live"
      let rtspLink = `rtsp://${ip}:${userName}@${password}:${port}/liv`;
      let rtspObj = {
        camName: camName,
        rtspLink: rtspLink,
        admin,
        adminID,
      };
      await axios
        .post(`${renderhost}/addCam`, rtspObj)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      console.log(rtspLink);

      setCamAdd(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="AddCameraPage">
      <div className="heading">
        <div className="headTitle">Camera </div>
        <div className="adminSec">
          <span className="adminText">Welcome {admin}</span>
          <span className="AvatarIcon">
            <Avatar alt={admin} src="/static/images/avatar/3.jpg" />
          </span>
        </div>
      </div>
      <div className="addCameraPage">
        <div class="attendanceTitle">
          Add camera (RTSP Link)
          {/* <span class="attendanceTherapists" blink="Students">
          Therapists
        </span>
        <span class="attendanceStudents" blink="Students">
          Students
        </span> */}
        </div>
        <div className="pageDivA">
          <div className="camAddDiv">
            {/* <div className="addCameraTitle">Add Camera</div> */}
            <div className="detailsName">
              <div className="naming">
                <div className="namingText">UserName</div>
                <div className="namingB">
                  <TextField
                    id="outlined-basic"
                    label="UserName"
                    variant="outlined"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="naming">
                <div className="namingText">Password</div>
                <div className="namingB">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="naming">
                <div className="namingText">CAM name</div>
                <div className="namingB">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={camName}
                    onChange={(e) => {
                      setCamName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="naming">
                <div className="namingText">IP Address</div>
                <div className="namingB">
                  <TextField
                    id="outlined-basic"
                    label="IP"
                    variant="outlined"
                    value={ip}
                    onChange={(e) => {
                      setIp(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="naming">
                <div className="namingText">Port</div>
                <div className="namingB">
                  <TextField
                    id="outlined-basic"
                    label="Port"
                    variant="outlined"
                    value={port}
                    onChange={(e) => {
                      setPort(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="naming">
                <div className="camAddSubmit">
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleAddCam();
                    }}
                  >
                    submit
                  </Button>
                </div>
              </div>
            </div>
            {/* <div className="camAddSubmit">
              <Button
                variant="contained"
                onClick={() => {
                  // handleAddCam();
                }}
              >
                submit
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
