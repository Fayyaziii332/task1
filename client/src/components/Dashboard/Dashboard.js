import React, { Component } from 'react';
import { Link, Switch } from "react-router-dom";
import PrivateRoute from '../private-route/PrivateRoute';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Layout, Menu, Button } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import EmployeeForm from '../Form/form.container';
import EmployeeTable from '../Table/table.container';

const { Header, Content, Footer, Sider } = Layout;
class Dashboard extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className="side" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div style={{ height: "30%", backgroundColor: "#002140" }} className="logo" >
            <img alt="logo" src="logoindex.svg" style={{ width: "50%", marginTop: "12%" }} />
            <br></br>
            <img alt="logo" src="logo.png" style={{ width: "60%", marginTop: "12%" }} />
          </div>
          <Menu style={{ paddingTop: "15%" }} theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/form" >Add Employee</Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ marginTop: "12%" }} icon={<DesktopOutlined />}>
              <Link to="/table">List</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 15, height: 90 }} >
            <h2 style={{ display: "inline-block", float: "left" }}> MERN BASIC TASK</h2>
            <Button
              onClick={this.onLogoutClick}
              style={{
                width: "100px",
                borderRadius: "8px",
                color: "white",
                backgroundColor: "rgb(64 104 142)",
                letterSpacing: "1.2px",
                float: "right",
                height: 50
              }} >
              Signout
    </Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, marginTop: "20px", minHeight: 600 }}>
              <Switch>
                <PrivateRoute path='/table' component={EmployeeTable} />
                <PrivateRoute exact path='/form' component={EmployeeForm} />
                <PrivateRoute render={() => <h3 style={{ color: "red", margin: "25px" }}>No Such Component Exists</h3>} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>MERN TASK Developed By @wan </Footer>
        </Layout>
      </Layout>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};
export default withRouter(Dashboard);
