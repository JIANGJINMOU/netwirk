import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Dashboard from './components/Dashboard';
import DeviceList from './components/DeviceList';
import Navbar from './components/Navbar';
import './styles/global.css';
import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Layout.Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<DeviceList />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App; 