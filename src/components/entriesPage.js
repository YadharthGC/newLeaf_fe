import { Avatar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ronaldo from "../images/blankProfile.jpg";
import "../CSS/entries.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import NestCamWiredStandIcon from "@mui/icons-material/NestCamWiredStand";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { funEdit, funLoading } from "../reactRedux/action";
import { useDispatch, useSelector } from "react-redux";
import { entrySample } from "../calendarSample";
import axios from "axios";
import { renderhost } from "../nodeLink";

export default function EntriesPage() {
  const dispatch = useDispatch();
  const [blink, setBlink] = useState("Therapists");
  const [users, setUsers] = useState([]);
  // const [showUsers, setShowUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const admin = window.localStorage.getItem("admin");
  const adminID = window.localStorage.getItem("adminID");
  const [candidatesIDArr, setCandidatesIDarr] = useState([]);
  const [status, setStatus] = useState(false);
  const [initialZero, setInitialZero] = useState(0);

  useEffect(() => {
    // console.log(entrySample);
    // setUsers(entrySample);
    // handleGetData();
    // setInterval(handleEntryData, 5000);
    handleEntryData();
  }, []);

  useEffect(() => {
    setStatus(false);
  }, [status]);

  const handleEntryData = async () => {
    try {
      // console.log(initialZero, "initialZero");
      // initialZero === 0 && dispatch(funLoading(true));
      // let count = initialZero;
      // setInitialZero((data) => data + 1);
      await axios
        .post(`${renderhost}/entries`, { admin, adminID })
        .then(async (res) => {
          let dataObj = res?.data?.message;
          console.log(dataObj);
          setUsers(dataObj.reverse());
          // setTimeout(async () => {
          //   await handleEntryData();
          // }, 5000);
        })
        .catch((err) => {
          console.log(err);

          dispatch(funLoading(false));
        });

      dispatch(funLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(funLoading(false));
    }
  };

  return (
    <>
      <div className="heading">
        <div className="headTitle">Entries</div>
        <div className="adminSec">
          <span className="adminText">Welcome {admin}</span>
          <span className="AvatarIcon">
            <Avatar alt={admin} src="/static/images/avatar/3.jpg" />
          </span>
        </div>
      </div>
      <div className="entriesSection">
        <div className="attendanceTitle">
          <span
            className="attendanceTherapists"
            blink={blink}
            onClick={() => {
              setBlink("Therapists");
            }}
          >
            Therapists
          </span>
          <span
            className="attendanceStudents"
            blink={blink}
            onClick={() => {
              setBlink("Students");
            }}
          >
            Students
          </span>
        </div>
        <div className="allTextDiv">
          <div className="userTextField">
            <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              value={searchUser}
              onChange={(e) => {
                setSearchUser(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="allTableDiv">
          <div className="allTableHead">
            <div className="headA entry">Image</div>
            <div className="headB entry">Name</div>
            {/* <div className="headD entry">Role</div> */}
            <div className="headC entry">Timing</div>
            {/* <div className="headE entry">Actions</div> */}
          </div>
          <div className="allTableBody">
            {console.log(searchUser)}
            {users?.length
              ? users.map((data) => {
                  if (
                    data.role === blink &&
                    (!searchUser ||
                      data.name
                        .toLowerCase()
                        .includes(searchUser.toLowerCase()))
                  ) {
                    return (
                      <div className="bodyPart">
                        <div className="conA entry">
                          <img
                            alt={data.name}
                            src={data.image}
                            className="entryUserImg"
                          />
                        </div>
                        <div className="conB entry">{data.name}</div>
                        {/* <div className="conC entry">{blink}</div> */}
                        <div className="conD entry">
                          <div>{data.time}</div>
                          <div>{data.date}</div>
                        </div>

                        <div className="conE entry">
                          <NestCamWiredStandIcon id="ipIcon" />
                        </div>
                      </div>
                    );
                  }
                })
              : ""}

            {!users?.length ? (
              <div style={{ textAlign: "center" }}>No Entries</div>
            ) : (
              ""
            )}

            {blink === "Therapists" &&
            users?.length &&
            users.filter((data) => {
              return data.role === "Therapists";
            }).length === 0 ? (
              <div style={{ textAlign: "center" }}>No Therapists Entries</div>
            ) : (
              ""
            )}

            {blink === "Students" &&
            users?.length &&
            users.filter((data) => {
              return data.role === "Students";
            }).length === 0 ? (
              <div style={{ textAlign: "center" }}>No Students Entries</div>
            ) : (
              ""
            )}

            {/* {users?.length
              ? users.map((data) => {
                  if (
                    data.role === blink &&
                    (!searchUser ||
                      data.name
                        .toLowerCase()
                        .includes(searchUser.toLowerCase())) &&
                    candidatesIDArr.includes(data.candidateID)
                  ) {
                    return (
                      <div className="bodyPart">
                        <div className="conA entry">
                          <img
                            alt={data.name}
                            src={data.image}
                            className="entryUserImg"
                          />
                        </div>
                        <div className="conB entry">{data.name}</div>
                        <div className="conC entry">{blink}</div>
                        <div className="conD entry">
                          <div>{data.time}</div>
                          <div>{data.date}</div>
                        </div>

                        <div className="conE entry">
                          <NestCamWiredStandIcon id="ipIcon" />
                        </div>
                      </div>
                    );
                  }
                })
              : ""} */}
          </div>
        </div>
      </div>
    </>
  );
}
