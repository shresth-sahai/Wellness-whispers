import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Award, Users, Star, Clock } from 'lucide-react';
import axios from 'axios';

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  // Handle input changes
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
      const response = await axios.post('https://mindshift-be.onrender.com/appointments', formData);
      setStatus('Appointment booked successfully!');
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    } catch (error) {
      setStatus('Failed to book the appointment. Please try again.');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={{ backgroundColor: 'teal' }} className="text-white py-5">
        <Container>
          <Row className="py-5">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="display-4 fw-bold mb-4">About Us</h1>
              <p className="lead mb-0">
                Leading the way in medical excellence, providing compassionate care for a healthier tomorrow.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mission & Vision */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <h3 style={{ color: 'teal' }} className="fw-bold mb-3">Our Mission</h3>
                <p className="text-muted mb-0">
                  To provide exceptional healthcare services with compassion and expertise, ensuring the well-being of our patients and communities through innovative medical solutions and personalized care.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <h3 style={{ color: 'teal' }} className="fw-bold mb-3">Our Vision</h3>
                <p className="text-muted mb-0">
                  To be the leading healthcare provider, recognized for excellence in patient care, medical innovation, and community health improvement, setting new standards in healthcare delivery.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Core Values */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center display-6 fw-bold mb-5">Our Core Values</h2>
          <Row className="g-4">
            {[
              {
                icon: <Users className="text-primary mb-3" size={40} />,
                title: "Patient-Centered Care",
                description: "We put our patients first, ensuring personalized attention and care."
              },
              {
                icon: <Award className="text-primary mb-3" size={40} />,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from patient care to service delivery."
              },
              {
                icon: <Star className="text-primary mb-3" size={40} />,
                title: "Integrity",
                description: "We maintain the highest standards of professionalism and ethical conduct."
              },
              {
                icon: <Clock className="text-primary mb-3" size={40} />,
                title: "Innovation",
                description: "We embrace cutting-edge medical technologies and procedures."
              }
            ].map((value, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    {value.icon}
                    <h4 className="fw-bold mb-2">{value.title}</h4>
                    <p className="text-muted mb-0">{value.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <Container className="py-5">
        <h2 className="text-center display-6 fw-bold mb-5">Our Leadership Team</h2>
        <Row className="g-4">
          {[
            {
              name: "Dr. Sarah Johnson",
              role: "Chief Medical Officer",
              image: "/api/placeholder/150/150"
            },
            {
              name: "Dr. Michael Chen",
              role: "Head of Cardiology",
              image: "/api/placeholder/150/150"
            },
            {
              name: "Dr. Emily Rodriguez",
              role: "Head of Pediatrics",
              image: "/api/placeholder/150/150"
            },
            {
              name: "Dr. James Wilson",
              role: "Head of Surgery",
              image: "/api/placeholder/150/150"
            }
          ].map((member, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle mb-3"
                    width="150"
                    height="150"
                  />
                  <h5 className="fw-bold mb-1">{member.name}</h5>
                  <p className="text-muted small mb-3">{member.role}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA Section */}
      <div style={{ backgroundColor: 'teal' }} className="text-white py-5">
        <Container className="text-center">
          <h2 className="display-6 fw-bold mb-4">Ready to Experience Our Care?</h2>
          <p className="lead mb-4">Schedule an appointment with one of our healthcare professionals today.</p>
          <Button variant="light" size="lg" onClick={() => setShowModal(true)}>
            Book an Appointment
          </Button>
        </Container>
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
            <Button variant="primary" type="submit" style={{ backgroundColor: '#00796b', borderColor: '#00796b' }} className="w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default About;