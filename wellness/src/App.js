import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicalHomepage from './components/MedicalHomepage';
import About from './components/About';
import Doctors from './components/Doctors';
import Community from './components/Community';
import ContactSection from './components/ContactSection';
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend API
      await axios.post('http://127.0.0.1:8000/appointments', formData);
      alert('Appointment booked successfully!');
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    } catch (error) {
      alert('Failed to book the appointment. Please try again.');
    }
  };

  // Function to scroll to Services or Contact section
  const handleScrollToSection = (section) => {
    // Check if we're on the Home page (root route)
    if (window.location.pathname === '/') {
      // Scroll directly to the target section
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on the Home page, redirect to Home and set the hash for scrolling
      window.location.href = `/?section=${section}`;
    }
  };

  // Effect hook to handle scrolling after page load when URL has a hash
  useEffect(() => {
    // Check if there's a section in the URL query
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section) {
      // Scroll to the section if it exists
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Allow time for the page to load and then scroll
    }
  }, []);

  return (
    <Router>
      {/* Navbar */}
      <Navbar bg="teal" expand="lg" className="py-3 shadow-sm" style={{ backgroundColor: 'teal' }}>
        <Container>
          <Navbar.Brand href="#home" className="fw-bold fs-4 text-light">
            {/* <img 
              src="favicon" 
              alt="MindShyft Logo" 
              style={{ height: '40px', marginRight: '10px' }} 
            /> */}
            MindShyft
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{ backgroundColor: 'teal' }} className="ms-auto align-items-center">
              <Nav.Link style={{ color: 'white' }} as={Link} to="/" className="mx-2">Home</Nav.Link>
              <Nav.Link
                style={{ color: 'white' }}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('services');
                }}
                className="mx-2"
              >
                Services
              </Nav.Link>
              <Nav.Link style={{ color: 'white' }} as={Link} to="/doctors" className="mx-2">Doctors</Nav.Link>
              <Nav.Link style={{ color: 'white' }} as={Link} to="/about" className="mx-2">About</Nav.Link>
              <Nav.Link
                style={{ color: 'white' }}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('contact');
                }}
                className="mx-2"
              >
                Contact
              </Nav.Link>

              <Button
                variant="primary"
                className="ms-3"
                style={{ backgroundColor: '#00796b', borderColor: '#00796b' }}
                onClick={() => setShowModal(true)}
              >
                Book Appointment
              </Button>
              <Nav.Link style={{ color: 'white' }} as={Link} to="/community" className="mx-2">Community</Nav.Link>
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

      {/* Modal for Booking Appointment */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book an Appointment</Modal.Title>
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
              <Form.Label>Preferred Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={3}
                placeholder="Additional details (optional)"
                value={formData.message}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: '#00796b', borderColor: '#00796b' }}
              className="w-100"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Router>
  );
}

export default App;

