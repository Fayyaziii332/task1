import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined ,MailOutlined} from '@ant-design/icons';



class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };



  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.errors!==prevState.errors){
      return { errors : nextProps.errors};
   }
   else return null;
 }
 
 componentDidUpdate(prevProps, prevState) {
   if(prevProps.errors!==this.props.errors){
     this.setState({errors: this.props.errors});
   }
 }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

onSubmit = e => {
    // e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
// console.log(newUser);
this.props.registerUser(newUser, this.props.history);
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">


       <div style={{marginTop:"15%"}} className="col s8 offset-s2">
           <div className="" style={{ paddingLeft: "11.250px" ,textAlign:"left"}}>
            <Link  to="/" style={{ display:"block",marginLeft:"24%"}} className="waves-effect">
               Back to
              home
            </Link>
            </div>
            <div>
              <img src="logo.png" style={{width:"45%"}} />
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" , marginBottom:"5%"}}>
              <h1>
                <b>Sign Up</b> 
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
                {(errors)?errors.name:""}
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
                {(errors)?errors.email:""}
                {(errors)?errors.emailnotfound:""}
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
            {(errors) ? errors.passwordincorrect:""}
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

      <Form.Item style={{textAlign:"left"}}>
        <Button id="btn-s" type="primary" htmlType="submit" className="login-form-button">
          Sign up
        </Button>
        Or <Link to="/login" >Sign In Now!</Link>
      </Form.Item>
    </Form>


            {/* <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" >
                    <p style={{textAlign:'right'}} className="grey-text text-darken-1">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
             </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    backgroundColor:"rgb(64 104 142)"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable"
                >
                  Sign up
                </button>
              </div>
            </form> */}
  
      </div>
    );
  }
}
Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


 export default Signup

