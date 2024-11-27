import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Clock, AlertCircle } from 'lucide-react';

const Doctors = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Section with Coming Soon */}
      <div className="flex-grow-1 d-flex align-items-center py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8} lg={6}>
              <div className="mb-4">
                <AlertCircle  size={60} className="icon-teal" />
              </div>
              <h1 style={{color:'teal'}} className="display-4 fw-bold mb-4">Coming Soon</h1>
              <p className="lead text-muted mb-4">
                Our team of expert doctors will be available here shortly. We're working hard to bring you the best medical professionals.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button style={{backgroundColor:'teal'}}  variant="primary" size="lg">Notify Me</Button>
                <Button style={{backgroundColor:'teal'}}  variant="primary" size="lg" as="a" href="/">
                  Return Home
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Launch Timer Section */}
      <div style={{backgroundColor:'teal'}}  className=" text-white py-4">
        <Container style={{backgroundColor:'teal'}}  >
          <Row style={{backgroundColor:'teal'}}  className="justify-content-center text-center">
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

export default Doctors;