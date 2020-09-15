import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

class Signup extends Component {
  constructor() {

    super();
    this.state = {

      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},

    };

  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {
    if (localStorage.jwtToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }



  onSubmit = (e) => {

    const newUser = {

      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,

    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { loading } = this.props;
    return (
      <div className="container">


        <div style={{ marginTop: "15%" }} className="col s8 offset-s2">
          <div className="" style={{ paddingLeft: "11.250px", textAlign: "left" }}>
            <Link to="/" style={{ display: "block", marginLeft: "24%" }} className="waves-effect">
              Back to
              home
            </Link>
          </div>
          <div>
            <img alt="logo" src="logo.png" style={{ width: "45%" }} />
          </div>
          <div className="col s12" style={{ paddingLeft: "11.250px", marginBottom: "5%" }}>
            <h1>
              <b>Sign Up</b>
              {(loading) ? (<div>Please Wait... <Spin /></div>) : ('')}
            </h1>
          </div>
        </div>


        <Form

          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onSubmit}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              onChange={this.handleChange}
              className="fields"
              value={this.state.name}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username" />
          </Form.Item>
          <span className="red-text">
            {(errors) ? errors.name : ""}
          </span>


          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              onChange={this.handleChange}
              className="fields"
              value={this.state.email}
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email" />
          </Form.Item>
          <span className="red-text">
            {(errors) ? errors.email : ""}
            {(errors) ? errors.emailnotfound : ""}
          </span>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              className="fields"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Item>
          <span className="red-text">
            {(errors) ? errors.password : ""}
            {(errors) ? errors.passwordincorrect : ""}
          </span>

          <Form.Item
            name="password2"
            rules={[{ required: true, message: 'Please confirm your Password!' }]}
          >
            <Input
              className="fields"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              value={this.state.password}
              placeholder="Confirm Password"
              onChange={this.handleChange}
            />
          </Form.Item>
          <span className="red-text">{errors.password2}</span>

          <Form.Item style={{ textAlign: "left" }}>
            <Button id="btn-s" type="primary" htmlType="submit" className="login-form-button">
              Sign up
        </Button>
        Or <Link to="/login" >Sign In Now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default Signup
