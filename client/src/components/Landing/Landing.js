import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography } from 'antd';
const { Title } = Typography;

class Landing extends Component {

  componentDidMount() {
    if (localStorage.jwtToken) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    
    return (
      <div style={{ height: "75vh" }} className="container">
        <div style={{ textAlign: "center" }} className="mainContent">
          <img alt="logo" src="logo1.png" style={{ width: "30%" }} />
          <Title style={{ color: "#4a7fd7" }}>Welcome to Wanclouds</Title>
          <Title style={{ padding: "20px", marginBottom: "20px", color: "grey" }} level={4}>Let's Start</Title>

          <Link
            to="/register"
            style={{
              width: "140px",
              borderRadius: "15px",
              letterSpacing: "1.5px",
              fontSize: "1.7em",
              color: "white",
              padding: "15px",
              backgroundColor: "#4a7fd7"
            }}
            className="btn-hover"
          >
            Sign Up
              </Link>
          <Link
            to="/login"
            style={{
              width: "140px",
              borderRadius: "15px",
              letterSpacing: "2px",
              fontSize: "1.7em",
              color: "white",
              padding: "15px",
              marginLeft: "12%",
              backgroundColor: "#4a7fd7"
            }}
            className="btn-hover"
          >
            Sign In
              </Link>
        </div>
      </div>
    );
  }
}
export default Landing;
