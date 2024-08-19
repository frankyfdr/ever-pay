import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Clients from './pages/Clients';
import Payments from './pages/Payments';
import CreateClient from './pages/CreateClient';
import EditClient from './pages/EditClient';
import CreatePayment from './pages/CreatePayment';
import Header from './Components/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Container sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<Clients />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/create" element={<CreateClient />} />
            <Route path="/clients/edit/:id" element={<EditClient />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/create" element={<CreatePayment />} />
          </Routes>
        </Container>
      </Container>
    </Router>
  );
};

export default App;
