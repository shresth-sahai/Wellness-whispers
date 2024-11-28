import React from 'react';
import { Container, Row, Col, Button,Carousel ,Card} from 'react-bootstrap';
import { Clock, AlertCircle } from 'lucide-react';
import '../App.css'
const Community = () => {
     const handleRedirect = () => {
    // Replace with your WhatsApp group invite link
    const whatsappLink = "https://chat.whatsapp.com/your-group-invite-link";
    window.open(whatsappLink, "_blank"); // Opens the link in a new tab
  };
  return (
    <div className="min-vh-80 d-flex flex-column">
      {/* Hero Section with Coming Soon */}
      <div className="flex-grow-1 d-flex  py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8} lg={6}>
              <div className="mb-4">
                <AlertCircle size={60} className="icon-teal" />
              </div>
              <h1 style={{color:'teal'}} className="display-4 fw-bold mb-4">Coming Soon</h1>
              <p className="lead text-muted mb-4">
                Our community platform is under development. We're creating a space where you can join 
                workshops, support groups, and events focused on mental wellness. Stay tuned for updates!
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button onClick={handleRedirect} style={{backgroundColor:'teal'}} variant="primary" size="lg">Notify Me</Button>
                <Button style={{backgroundColor:'teal'}} variant="primary" size="lg" as="a" href="/">
                  Return Home
                </Button>
              </div>
            </Col>
          </Row>
              </Container>
              
          </div>
          
<Carousel interval={4000} indicators={true} controls={true}>
  {[
   [
  {
    image: 'https://www.parenta.com/wp-content/uploads/2022/03/171764278_l-scaled.jpg',
    title: 'Master Your Mind: Anxiety & Stress Management Webinar',
    description: 'Join our online session to explore proven techniques for managing stress and building resilience in daily life.',
    link: '/blogs/sleep-health'
  },
  {
    image: 'https://innerspacetherapy.in/wp-content/uploads/2023/07/19457380-scaled.jpg',
    title: 'Mindfulness in Action: Meditation Workshop (Online)',
    description: 'A transformative webinar to help you cultivate mindfulness and inner peace through guided meditation practices.',
    link: '/blogs/mindfulness'
  },
  {
    image: 'https://s3.amazonaws.com/utep-uploads/wp-content/uploads/online-regis-college/2023/04/20020602/RC-MSN-2022-Q4-Skyscraper_-Understanding-the-Youth-Mental-Health-Crisis-01.jpg',
    title: 'Youth Mental Health Revolution: Virtual Discussion Panel',
    description: 'An engaging online panel discussion for young adults focusing on mental health awareness and peer support strategies.',
    link: '/blogs/emotional-resilience'
  },
  {
    image: 'https://img.freepik.com/premium-vector/children-different-nationalities-meditating-lotus-pose-yoga-kids_254685-873.jpg',
    title: 'Youth Wellness Retreat: Onsite Mindfulness Meet-Up',
    description: 'An exclusive in-person event to foster connection and mental well-being through mindfulness and group activities.',
    link: '/blogs/emotional-resilience'
  }
]
  ].map((group, index) => (
    <Carousel.Item key={index}>
          <Row className="justify-content-center g-4" style={ {gap:'10px'}}>
        {group.map((blog, idx) => (
          <Col lg={2} md={6} sm={12} key={idx}>
            <Card className="border-3 shadow-sm ">
              <Card.Img
                variant="top"
                src={blog.image}
                alt={blog.title}
                style={{ height: '200px', objectFit: 'contain'}}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{blog.title}</Card.Title>
                <Card.Text>{blog.description}</Card.Text>
                        <Button
                            disabled
                  variant="light"
                  href={blog.link}
                  style={{ backgroundColor: 'teal', color: 'white', borderColor: 'teal',marginRight: '10px' }}
                >
                  Register Comming Soon!
                        </Button>
                       
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Carousel.Item>
  ))}
          </Carousel>
          <br />
          <br />
          <br />
           <br />

      {/* Launch Timer Section */}
      <div style={{backgroundColor:'teal'}} className="text-white py-4">
        <Container style={{backgroundColor:'teal'}}>
          <Row style={{backgroundColor:'teal'}} className="justify-content-center text-center">
            <Col md={8}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Clock size={24} />
                <span className="fs-5">Launching in: Coming Soon</span>
              </div>
                      </Col>
                      
                      
                  </Row>
                  
              </Container>
              
          </div>
          
    </div>
  );
};

export default Community;