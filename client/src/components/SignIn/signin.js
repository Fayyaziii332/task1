import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Spin } from 'antd';



const Signin = (props) => {


const [state,setState] = useState(
    {
      email: "",
      password: "",
      errors: {}
    })

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const onSubmit = e => {
         const userData = {
          email: state.email,
          password: state.password
        };
        props.loginUser(userData); 
      };

    useEffect(() => {
        if (localStorage.jwtToken) {
            props.history.push("/dashboard");
          }
    })



    const { errors ,loading} = props
   
return(
      <div className="container">


      <div style={{marginTop:"20%"}} className="col s8 offset-s2">
          <div className="" style={{ paddingLeft: "11.250px" ,textAlign:"left"}}>
            <Link  to="/" style={{ display:"block",marginLeft:"24%"}} className="waves-effect">
               Back to
              home
            </Link>
            </div>
            <div>
              <img alt="logo" src="logo.png" style={{width:"45%"}} />
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" , marginBottom:"5%"}}>
              <h1>
                <b>Sign In</b> 
              </h1>
              {(loading)?(<div>Please Wait... <Spin /></div>):("")}
              <span className="red-text">
                      {(errors)? errors.message :''}
              </span>
            </div>      
      </div>

<Form
      
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input 
        onChange={handleChange}
        className="fields" 
        value={state.email}
        prefix={<UserOutlined className="site-form-item-icon" />} 
        placeholder="Username" />
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
          value={state.password}
          placeholder="Password"
          onChange={handleChange}
        />
      </Form.Item>
      <span className="red-text">
            {(errors) ? errors.password : ""}
            {(errors) ? errors.passwordincorrect:""}
      </span>
      
      <Form.Item style={{textAlign:"left"}}>
        <Button id="btn-s" type="primary" htmlType="submit" className="login-form-button">
          Sign in
        </Button>
        Or <Link to="/register" >Sign Up Now!</Link>
      </Form.Item>
    </Form>

      </div>
    );
  
}

export default Signin