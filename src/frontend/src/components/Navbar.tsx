import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { DashboardOutlined, LaptopOutlined } from '@ant-design/icons';

const Navbar: React.FC = () => {
    const location = useLocation();
    
    return (
        <Layout.Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]}
            >
                <Menu.Item key="/" icon={<DashboardOutlined />}>
                    <Link to="/">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="/devices" icon={<LaptopOutlined />}>
                    <Link to="/devices">Devices</Link>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
};

export default Navbar;
