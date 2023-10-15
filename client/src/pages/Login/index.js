import React, { useEffect } from "react";
import { Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Loginuser } from "../../api/users";
import { useDispatch } from "react-redux";
import {ShowLoading,Hideloading} from "../../redux/loadersSlice"
import logo from "../images/todo1.png"
import todo from "../images/todo2.jpg"



const Login = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch();

  const onFinish = async (v) => {
    try {
      dispatch(ShowLoading());
      const response = await Loginuser(v);
      dispatch(Hideloading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);

        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container-custom mr-0 pr-0">
    <div className="row m-0">
      <div className="col-md-6 col-lg-6">
        <div className="row d-flex">
          <div className="logo">
            <img src={logo} className="imagelogo" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
            <div className="col-md-6">
      <Form layout="vertical" onFinish={onFinish} className="m-2">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input Your Mail ID" }]}
        >
          <input className="w-100" type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input Your Password" }]}
        >
          <input className="w-100" type="password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-100 mt-2 mb-4">
          <h6>LOGIN</h6>
        </Button>
        <Link to="/register">
          <div className="text-success">Don't have an Account? Register</div>
        </Link>
      </Form>
      </div>
            
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-6 col-sm-12 text-right pr-0 mt-4">
        <br/><br/>
        <img
          src={todo}
          className="img-class"
          alt="Responsive image"
        />
      </div>
    </div>
  </div>
  );
};

export default Login;
