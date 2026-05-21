import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import Login from './Components/Login';
import AiAssistant from './Components/AiAssistant';
import { getToken, setToken } from './api/client';

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLogin = (name) => {
    localStorage.setItem('username', name);
    setUsername(name);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('username');
    setUsername('');
  };

  const marginTop = { marginTop: '20px' };

  return (
    <Router>
      <div className="App">
        <NavigationBar username={username} onLogout={handleLogout} />
        <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Routes>
                <Route path="/" element={<Bienvenue />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                  path="/list"
                  element={
                    <PrivateRoute>
                      <VoitureListe />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/add"
                  element={
                    <PrivateRoute>
                      <Voiture />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    <PrivateRoute>
                      <Voiture />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ai"
                  element={
                    <PrivateRoute>
                      <AiAssistant />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}
