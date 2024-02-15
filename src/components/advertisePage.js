import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
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
import "../SCSS/advertisePage.scss";
import FileBase64 from "react-file-base64";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { Player } from "video-react";

export default function AdvertisePage() {
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
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showSrc, setShowSrc] = useState("");
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    handleGetAd();
  }, []);

  const handleSubmit = async () => {
    try {
      dispatch(funLoading(true));
      await axios
        .post(`${renderhost}/postad`, { fileName })
        .then(async (res) => {
          console.log(res.data?.message);
          setFileName("");
          //dom
          let el = document
            .querySelector("#AdvertisePage")
            ?.querySelector(".camAddSubmit.inputBase")
            ?.querySelector("input");
          if (el) {
            el.value = "";
          }
          ////
          alert("Advertisement posted succesfully");
          await handleGetAd();
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch(funLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(funLoading(false));
    }
  };

  const handleGetAd = async () => {
    try {
      dispatch(funLoading(true));
      await axios
        .post(`${renderhost}/getad`)
        .then((res) => {
          console.log(res.data?.message?.fileName);
          setShowSrc(res.data?.message?.fileName);
        })
        .catch((err) => console.log(err));
      dispatch(funLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(funLoading(false));
    }
  };

  return (
    <div id="AdvertisePage">
      <div className="heading">
        <div className="headTitle">Advertisement </div>
        <div className="adminSec">
          <span className="adminText">Welcome {admin}</span>
          <span className="AvatarIcon">
            <Avatar alt={admin} src="/static/images/avatar/3.jpg" />
          </span>
        </div>
      </div>
      <div className="advertisePage">
        <div class="attendanceTitle">Add Advertisement</div>
        <div className="pageDivA">
          <div className="camAddDiv">
            <div className="detailsName">
              <div className="naming">
                <div className="namingText">
                  Upload the Advertisement video :
                  <span className="videoSpanAd">
                    <VideoCameraBackIcon
                      id="adIcon"
                      onClick={() => {
                        handleOpen();
                        // setShowSrc(data.video);
                      }}
                    />
                  </span>
                </div>
                <div className="namingB">
                  <div
                    className={
                      fileName
                        ? "camAddSubmit inputBase green"
                        : "camAddSubmit inputBase"
                    }
                  >
                    <FileBase64
                      id="fileBaseDiv"
                      // multiple={true}
                      value={fileName}
                      onDone={(e) => {
                        console.log(e, e.base64);
                        setFileName(e.base64);
                        // e.getFiles.bind(e);
                      }}
                    />
                    {/* <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      id={fileName ? "uploadingBtnTrue" : "uploadingBtn"}
                      startIcon={<CloudUploadIcon />}
                    >
                      <span id="filename">
                        {fileName ? fileName : "Upload file"}
                      </span>
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                          setFileName(e?.target?.value);
                          console.log(e);
                        }}
                      />
                    </Button> */}
                  </div>
                </div>
                <div className="namingB">
                  <div className="camAddSubmit">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      submit
                    </Button>
                  </div>
                </div>
              </div>

              {/* <div className="naming cam">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ marginTop: "5%", marginBottom: "5%" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* <ReactPlayer src="https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1" /> */}
            <Player
              autoPlay={true}
              onEnded={() => {
                handleClose();
              }}
            >
              {/* <source src="https://firebasestorage.googleapis.com/v0/b/ablelyfvideo.appspot.com/o/videos%2FFacebook%20242169015424324(720p).mp4?alt=media&token=a8570090-8ed5-421f-9c3b-05fd55f507d1" /> */}
              <source src={showSrc} />
            </Player>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
