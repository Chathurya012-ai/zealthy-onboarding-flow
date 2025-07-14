// @ts-ignore
//import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import OnboardingWizard from './pages/OnboardingWizard';
import AdminPanel from './pages/AdminPanel';
import DataTable from './pages/DataTable';

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<OnboardingWizard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/data" element={<DataTable />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;