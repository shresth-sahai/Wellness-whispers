import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicalHomepage from './components/MedicalHomepage';
import About from './components/About';
import Doctors from './components/Doctors';
import Community from './components/Community';
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    qualification: '',
    bio: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate the form before submission
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.specialization ||
      !formData.experience ||
      !formData.qualification ||
      !formData.bio
    ) {
      alert('Please fill out all required fields.');
      return false;
    }
    if (formData.experience < 0) {
      alert('Experience must be a positive number.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        'https://mindshift-be.onrender.com/doctors/register',
        formData
      );
      alert(response.data.message || 'Registration successful!');
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        experience: '',
        qualification: '',
        bio: '',
      });
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        alert(`Error: ${error.response.data.detail}`);
      } else {
        alert('Email already registered, use a new one please!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      {/* Navbar */}
      <Navbar bg="teal" expand="lg" className="py-3 shadow-sm" style={{ backgroundColor: 'teal' }}>
        <Container>
          <Navbar.Brand href="#home" className="fw-bold fs-4 text-light">
            MindShift
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{ backgroundColor: 'teal' }} className="ms-auto align-items-center">
              <Nav.Link style={{ color: 'white' }} as={Link} to="/" className="mx-2">
                Home
              </Nav.Link>
              <Nav.Link style={{ color: 'white' }} as={Link} to="/doctors" className="mx-2">
                Doctors
              </Nav.Link>
              <Nav.Link style={{ color: 'white' }} as={Link} to="/about" className="mx-2">
                About
              </Nav.Link>
              <Nav.Link style={{ color: 'white' }} as={Link} to="/community" className="mx-2">
                Community
              </Nav.Link>
              <Button
                variant="primary"
                className="ms-3"
                style={{ backgroundColor: '#00796b', borderColor: '#00796b' }}
                onClick={() => setShowModal(true)}
              >
                Join as a Consultant
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div>
        <Routes>
          <Route path="/" element={<MedicalHomepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>

      {/* Modal for Doctor Registration */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register as a Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                placeholder="Enter your specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Experience (in years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                placeholder="Enter years of experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                placeholder="Enter your qualifications"
                value={formData.qualification}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                rows={3}
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: '#00796b', borderColor: '#00796b' }}
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Router>
  );
}

export default App;