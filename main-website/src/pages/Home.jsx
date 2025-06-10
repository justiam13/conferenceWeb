import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRocket, FaChartLine, FaUsers, FaCog } from 'react-icons/fa';
import Announcements from './Announcements';  // import the new component
import { Carousel } from 'react-bootstrap';


const Home = () => {
  const announcements = [
    "🎤 Keynote Speaker Announced: Dr. Jane Doe!",
    "📅 Early Bird Registration Ends June 30th!",
    "🤝 Networking Event added on Day 2 - Don’t miss out!",
  ];

  return (
    <div>
      {/* Announcements Section - added here */}
      <Announcements messages={announcements} />
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="fade-in">
              <h1 className="display-4 fw-bold mb-4">
                Join the Future of Innovation at Our Annual Conference
              </h1>
              <p className="lead mb-4">
                Connect with industry leaders, discover cutting-edge technologies, and grow your professional network.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/register" variant="light" size="lg">
                  Register Now
                </Button>
                <Button as={Link} to="/agenda" variant="outline-light" size="lg">
                  View Agenda
                </Button>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block fade-in">
              <img
                src="/conference-hero.svg"
                alt="Conference Banner"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Announcements Section - added here */}
      <Announcements messages={announcements} />
      <section className="py-5 bg-dark">
  <Container>
    <Carousel interval={3500} pause="hover">
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="https://images.unsplash.com/photo-1581090700227-1e8b1f5d7041?auto=format&fit=crop&w=800&q=80"
          alt="Keynote Speaker"
        />
        <Carousel.Caption>
          <h5>Keynote Speakers</h5>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="https://images.unsplash.com/photo-1587614382346-4ecf3a5df3c4?auto=format&fit=crop&w=800&q=80"
          alt="Workshops"
        />
        <Carousel.Caption>
          <h5>Hands-on Workshops</h5>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
          alt="Networking"
        />
        <Carousel.Caption>
          <h5>Networking Events</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </Container>
</section>




      {/* Services Section (Rebranded as Conference Highlights) */}
      <section className="py-8">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Conference Highlights</h2>
            <p className="section-subtitle">
              What to expect from this year's event
            </p>
          </div>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="h-100 hover-shadow">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaRocket size={32} />
                  </div>
                  <Card.Title>Inspirational Keynotes</Card.Title>
                  <Card.Text>
                    Hear from visionaries driving innovation across multiple industries.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 hover-shadow">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaChartLine size={32} />
                  </div>
                  <Card.Title>Insightful Workshops</Card.Title>
                  <Card.Text>
                    Participate in hands-on sessions to sharpen your skills and knowledge.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 hover-shadow">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaUsers size={32} />
                  </div>
                  <Card.Title>Networking Opportunities</Card.Title>
                  <Card.Text>
                    Connect with peers, mentors, and industry experts to expand your professional circle.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 hover-shadow">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaCog size={32} />
                  </div>
                  <Card.Title>Exhibitor Showcase</Card.Title>
                  <Card.Text>
                    Explore the latest products and services from leading technology providers.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-8">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-4">Ready to Elevate Your Career?</h2>
              <p className="lead mb-4">
                Register today and join thousands of professionals shaping the future.
              </p>
              <Button as={Link} to="/register" variant="primary" size="lg">
                Register Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
