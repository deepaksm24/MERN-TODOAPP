import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { Col, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment"
import AddTask from "./AddTask";

function Home() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  

 
  return (
    <div>   
       <AddTask/> 
    </div>
  );
}

export default Home;
