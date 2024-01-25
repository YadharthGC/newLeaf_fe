import { Avatar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ronaldo from "../images/blankProfile.jpg";
import "../CSS/entries.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import NestCamWiredStandIcon from "@mui/icons-material/NestCamWiredStand";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { funEdit } from "../reactRedux/action";
import { useDispatch, useSelector } from "react-redux";
import { entrySample } from "../calendarSample";

export default function EntriesPage() {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const [blink, setBlink] = useState("Therapists");
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const admin = window.localStorage.getItem("admin");
  const adminID = window.localStorage.getItem("adminID");

  useEffect(() => {
    console.log(entrySample);
    setUsers(entrySample);
  }, []);

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
            <div className="headA entry">{blink}</div>
            <div className="headB entry">Name</div>
            <div className="headD entry">
              {blink === "Students" ? "Shift" : "EmployeeID"}
            </div>
            <div className="headC entry">Timing</div>
            <div className="headE entry">Actions</div>
          </div>
          <div className="allTableBody">
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
                            alt="Cindy Baker"
                            src={ronaldo}
                            className="entryUserImg"
                          />
                        </div>
                        <div className="conB entry">{data.name}</div>
                        <div className="conC entry">123456789</div>
                        <div className="conD entry">
                          <div>{data.time}</div>
                          <div>{data.date}</div>
                        </div>

                        <div className="conE entry">
                          {/* <NestCamWiredStandIcon id="ipIcon" />
                        <VideocamIcon id="webIcon" /> */}
                          {/* <ModeEditIcon
                            id="editIcon"
                            onClick={() => {
                              dispatch(funEdit(true));
                              // dispatch(funSelectCandidate(data));
                              // navigate("/register");
                            }}
                          /> */}
                          <DeleteIcon
                            id="delIcon"
                            onClick={() => {
                              // handleDeleteData(data);
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
