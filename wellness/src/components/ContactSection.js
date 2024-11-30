import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Phone, Mail, Clock } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import axios from 'axios';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mindshift-be.onrender.com/contact-us', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="py-5" id="contact">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Contact Us</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Get in touch with us for any inquiries or to schedule an appointment.
          </p>
        </div>
        <Row>
          <Col md={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h3 className="fw-bold mb-4">Send us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows={4}
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <Button variant="primary" style={{ backgroundColor: 'teal' }} className="w-100" type="submit">
                    Send Message
                  </Button>
                </form>
                {status && <p className="text-center mt-3">{status}</p>}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h3 className="fw-bold mb-4">Contact Information</h3>
                <div className="d-flex align-items-center mb-4">
                  <Phone style={{ color: 'teal' }} size={24} className="text-primary me-3" />
                  <div>
                    <h5 className="fw-bold mb-1">Phone</h5>
                    <p className="text-muted mb-0">+91 8787080870</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <Mail style={{ color: 'teal' }} size={24} className="text-primary me-3" />
                  <div>
                    <h5 className="fw-bold mb-1">Email</h5>
                    <p className="text-muted mb-0">queries@mindshift.co.in</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <Clock style={{ color: 'teal' }} size={24} className="text-primary me-3" />
                  <div>
                    <h5 className="fw-bold mb-1">Working Hours</h5>
                    <p className="text-muted mb-0">Mon-Sun: 24 * 7</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="fw-bold mb-3">Follow Us</h5>
                  <div className="d-flex gap-3 mt-3">
                    <a
                      href="https://www.instagram.com/mindshift.co.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'teal' }}
                    >
                      <FaInstagram size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/officialmindshift/posts/?feedView=all"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'teal' }}
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="https://x.com/onemindshift"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'teal' }}
                    >
                      <FaTwitter size={24} />
                    </a>
                    <a
                      href="https://www.youtube.com/@WellnessWhisperOfficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'teal' }}
                    >
                      <FaYoutube size={24} />
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactSection;
