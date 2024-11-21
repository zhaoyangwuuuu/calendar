import React from "react";
import { Layout, Menu } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import CalendarComponent from "../components/Calendar";
import "./styles/Dashboard.less";

const { Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout id='dashboard-layout'>
      <Sider collapsible>
        <div className='logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={["calendar"]}>
          <Menu.Item key='calendar' icon={<CalendarOutlined />}>
            Calendar
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content>
          <CalendarComponent />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
