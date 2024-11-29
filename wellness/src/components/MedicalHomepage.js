import React, { useState } from 'react';
import 'animate.css';
import { 
  Navbar, 
  Nav, 
  Container, 
  Button, 
  Row, 
  Col, 
  Card ,Modal,Form
} from 'react-bootstrap';
import { Clock, Phone, Mail, Heart, Activity, Users } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import '../App.css';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import ContactSection from './ContactSection';

const MedicalHomepage = () => {
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
      await axios.post('https://mindshift-be.onrender.com/appointments', formData);
      alert('Appointment booked successfully!');
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    } catch (error) {
      alert('Failed to book the appointment. Please try again.');
    }
  };
  return (
    <div>
      {/* Top Info Bar */}
      <div className=" py-2 border-bottom">
        <Container>
          <Row className="align-items-center">
  <Col xs={12} className="d-flex flex-wrap justify-content-between align-items-center">
    <div className="d-flex align-items-center me-4">
      <Clock size={16} className="me-2" />
      <small>Mon-Sun: 24 * 7</small>
    </div>
    <div className="d-flex align-items-center me-4">
      <Phone size={16} className="me-2" />
      <small>+91 8787080870</small>
    </div>
    <div className="d-flex align-items-center">
      <Mail size={16} className="me-2" />
      <small>shresth@mindshift.co.in</small>
    </div>
  </Col>
</Row>
        </Container>
      </div>


      {/* Hero Section */}
   <div className="bg-light py-5">
  <Container>
    <Row className="py-5 align-items-center">
      {/* Text Content */}
      <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInUp">
  Your Health Is Our Top Priority
</h1>
        <p className="lead mb-4">
          Experience world-class healthcare with our team of expert doctors and modern facilities.
          We're here to provide you with the best medical care possible.
        </p>
        <div className="d-flex gap-3">
          <Button variant="primary" size="lg" style={{ backgroundColor: 'teal', borderColor: '#00796b' }} onClick={() => setShowModal(true)}>Book Appointment</Button>
                <Button
                   size="lg"
 
  href="https://cmhlp.org/imho/blog/indias-digital-mental-health-landscape-government-initiatives-and-challenges/"
                  target="_blank"
                  style={{ backgroundColor: 'teal', borderColor: '#00796b' }}
>
   India's Digital Mental Health Landscape
</Button>
        </div>
      </Col>

      {/* Image Placeholder */}
      <Col lg={6} className="text-center" style={{ paddingLeft: '30px', backgroundColor: '#f8f9fa' }}>
        <img 
          src="https://www.pngitem.com/pimgs/m/521-5216714_radiologydna-childrens-mental-health-clipart-hd-png-download.png" 
          alt="Health Priority" 
          className="img-fluid rounded"
          style={{ maxWidth: '90%', height: 'auto', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px' }}
        />
      </Col>
    </Row>
  </Container>
</div>

      {/* Services Section */}
   <Container className="py-5" id="services">
  <div className="text-center mb-5">
    <h2 className="display-6 fw-bold mb-3">Our Mental Health Services</h2>
    <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
      We are dedicated to providing a range of mental health services tailored to support your well-being and improve your quality of life.
    </p>
  </div>
  <Row>
    {[
      {
        icon: <Heart size={40} className="icon-teal" />,
        title: "Therapy & Counseling",
        description:
          "Personalized one-on-one sessions with licensed therapists to address emotional challenges and mental health concerns.",
      },
      {
        icon: <Activity size={40} className="icon-teal" />,
        title: "Stress Management Programs",
        description:
          "Workshops and techniques designed to help you manage stress effectively and improve resilience.",
      },
      {
        icon: <Users size={40} className="icon-teal" />,
        title: "Support Groups",
        description:
          "Safe and moderated spaces to connect with others who share similar experiences and challenges.",
      },
      {
        icon: <Heart size={40} className="icon-teal" />,
        title: "Mindfulness & Meditation",
        description:
          "Guided mindfulness practices to enhance mental clarity, reduce anxiety, and improve overall mental well-being.",
      },
      {
        icon: <Activity size={40} className="icon-teal" />,
        title: "Youth Mental Health Programs",
        description:
          "Focused programs for young adults and teens to address mental health issues like anxiety, depression, and academic stress.",
      },
      {
        icon: <Users size={40} className="icon-teal" />,
        title: "Crisis Intervention",
        description:
          "Immediate support and intervention for individuals experiencing a mental health crisis.",
      },
    ].map((service, index) => (
      <Col md={4} key={index} className="mb-4">
        <Card className="h-100 border-0 shadow-sm">
          <Card.Body className="text-center p-4">
            <div className="mb-3">{service.icon}</div>
            <Card.Title className="fw-bold mb-3">{service.title}</Card.Title>
            <Card.Text className="text-muted">{service.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>

      {/* Why Choose Us */}
      {/* <div className="bg-light py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">Why Choose Us</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              We're dedicated to providing you with the highest quality healthcare services.
            </p>
          </div>
          <Row className="text-center">
            {[
              { number: "50+", text: "Expert Doctors" },
              { number: "10,000+", text: "Satisfied Patients" },
              { number: "99%", text: "Success Rate" },
              { number: "25+", text: "Years Experience" }
            ].map((stat, index) => (
              <Col md={3} key={index} className="mb-4">
                <div className="p-4">
                  <h3 className="display-5 fw-bold text-primary mb-2">{stat.number}</h3>
                  <p className="text-muted mb-0" >{stat.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div> */}

      {/* Call to Action */}
 <div className="text-white py-5" style={{ backgroundColor: 'teal',marginBottom:'2rem' }}>
  <Container className="text-center">
    <h2 className="display-6 fw-bold mb-3">Need a Wellness Expert?</h2>
    <p className="lead mb-4">
      Book an appointment now and get the best care you deserve.
    </p>
    <Button variant="light" size="lg" className="mb-5" onClick={() => setShowModal(true)}>
      Book Appointment Now
          </Button>
          
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

    {/* Carousel Section */}
    <Carousel interval={4000} indicators={true} controls={true}>
      {[
        [
          {
            image: 'https://molekule.com/cdn/shop/articles/Woman-meditating_1600x.jpg?v=1682107538',
            title: 'Understanding Anxiety',
            description: 'Learn the signs and coping mechanisms for anxiety.',
            link: 'https://nmji.in/anxiety-disorders/'
          },
          {
            image: 'https://img.freepik.com/premium-vector/stress-management-balance-work-concentration-mental-health-work-life-balance-design_566886-1205.jpg',
            title: 'Overcoming Depression',
            description: 'Discover effective strategies to overcome depression.',
            link: 'https://blog.mygov.in/take-care-of-mental-health-while-at-home/'
          },
          {
            image: 'https://www.akshayamedicalcentre.com/wp-content/uploads/2022/05/08-stress-managment.png',
            title: 'Importance of Mental Health',
            description: 'Explore why mental health matters in our daily lives.',
            link: 'https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/stress-management-techniques-to-reduce-heart-disease-risk/articleshow/112602161.cms'
          },
          {
            image: 'https://www.mondaycampaigns.org/wp-content/uploads/2021/01/destress-monday-feature-5-techniques-for-stress-management.png',
            title: 'Stress Management Techniques',
            description: 'Practical steps to handle stress effectively.',
            link: '/blogs/stress-management'
          }
        ],
        [
          {
            image: 'https://www.parenta.com/wp-content/uploads/2022/03/171764278_l-scaled.jpg',
            title: 'Improving Sleep Quality',
            description: 'Tips for better sleep and mental clarity.',
            link: 'https://blogs.cdc.gov/niosh-science-blog/2020/06/29/sleep-hwd/'
          },
          {
            image: 'https://media.istockphoto.com/id/1398647270/vector/psychology-pressure-mental-problems-stress-management-relaxation-to-relieve-anxiety-from.jpg?s=612x612&w=0&k=20&c=nMfejNkjV0-NXb7daySde6MNfvE9OvteVyehRQqKDDA=',
            title: 'Mindfulness Practices',
            description: 'Cultivate mindfulness to improve overall well-being.',
            link: 'https://yoga.ayush.gov.in/blog?q=54'
          },
          {
            image: 'https://img.freepik.com/free-vector/hand-drawn-flat-people-hobbies_23-2149059773.jpg',
            title: 'Building Emotional Resilience',
            description: 'Learn how to bounce back from emotional challenges.',
            link: 'https://blog.mygov.in/take-care-of-mental-health-while-at-home/'
          },
          {
            image: 'https://img.freepik.com/free-vector/mental-health-awareness-concept_52683-37916.jpg',
            title: 'Benefits of Therapy',
            description: 'Understand how therapy can transform your life.',
            link: 'https://www.nami.org/major-depression/walking-on-a-tight-rope-coping-with-depression/'
          }
        ]
      ].map((group, index) => (
        <Carousel.Item key={index}>
          <Row className="g-4">
            {group.map((blog, idx) => (
              <Col lg={3} md={6} sm={12} key={idx}>
                <Card className="border-1 padding-1 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={blog.image} 
                    alt={blog.title} 
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold">{blog.title}</Card.Title>
                    <Card.Text>{blog.description}</Card.Text>
                    <Button 
                      variant="light" 
                      href={blog.link} 
                      style={{ backgroundColor: 'white', color: 'teal', borderColor: 'teal' }}
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
         
            
          </Row>
          <br />
             <br />
        </Carousel.Item>
      ))}
    </Carousel>
  </Container>
</div>

      {/* Contact Section */}
<ContactSection/>

      {/* Footer */}
<footer className="text-white py-5" style={{ backgroundColor: 'teal' }}>
  <Container>
    <Row>
      {/* MindCare Health Section */}
      <Col md={6} className="mb-4">
        <h5 className="fw-bold mb-3">MindShift</h5>
        <p>
          At MindShift, we are committed to fostering mental wellness and emotional resilience.
          Our approach combines compassionate care, evidence-based therapies, and a holistic outlook
          to address the unique challenges faced by individuals. We believe mental health is not just
          the absence of illness but the presence of a fulfilling, meaningful life. From anxiety and
          depression to stress management and personal growth, our dedicated professionals are here to
          guide you every step of the way. Take the first step toward a healthier mind and a brighter
          future — because your mental health matters.
        </p>
      </Col>

      {/* Quick Links Section */}
      <Col md={3} className="mb-4">
        <h5 className="fw-bold mb-3">Quick Links</h5>
        <Nav className="flex-column">
          <Nav.Link 
            href="#services" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-light p-0 mb-2"
          >
            Our Services
          </Nav.Link>
          <Nav.Link 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-light p-0 mb-2"
          >
            Contact Us
          </Nav.Link>
          <Nav.Link as={Link} to="/doctors" className="text-light p-0 mb-2">
            Mental Health Professionals
          </Nav.Link>
          <Nav.Link href="#" className="text-light p-0 mb-2">
            Crisis Support
          </Nav.Link>
          <div className="d-flex gap-3 mt-3">
            <a href="https://www.facebook.com/profile.php?id=61569473794390" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f2f1' }}>
              <FaFacebook size={24} />
            </a>
            <a href="https://www.threads.net/@officialwellnesswhisper" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f2f1' }}>
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/officialwellnesswhisper/" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f2f1' }}>
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f2f1' }}>
              <FaLinkedin size={24} />
                  </a>
                  <a href="https://x.com/WellneesWhisper" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f2f1' }}>
              <FaTwitter size={24} />
                  </a>
                    <a href="https://www.youtube.com/@WellnessWhisperOfficial" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f2f1' }}>
              <FaYoutube size={24} />
                  </a>
                 
          </div>
        </Nav>
      </Col>

      {/* Address Section */}
      <Col md={3} className="mb-4">
        <h5 className="fw-bold mb-3">Address</h5>
        <p style={{ color: '#e0f2f1', marginBottom: '0.5rem' }}>SLS Serenity</p>
        <p style={{ color: '#e0f2f1', marginBottom: '0.5rem' }}>Bellandur, Bangalore</p>
        <p style={{ color: '#e0f2f1' }}>Pincode: 560103</p>
      </Col>
    </Row>

    {/* Footer Bottom Row */}
    <Row className="mt-4">
      <Col className="text-center">
        <p className="text-light mb-0">
          Remember: Your mental health matters. Seeking help is a sign of strength, not weakness.
        </p>
      </Col>
    </Row>
  </Container>
</footer>
    </div>
  );
};

export default MedicalHomepage;