import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaMicrophoneAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaHandshake,
  FaNetworkWired,
  FaCalendarAlt,
  FaStar,
  FaComments
} from 'react-icons/fa';

const Services = () => {
  const offerings = [
    {
      icon: <FaMicrophoneAlt size={32} />,
      title: 'Keynote Sessions',
      description: 'Inspiring talks by industry leaders sharing their vision and expertise.',
      features: [
        'Visionary Speakers',
        'Cutting-edge Topics',
        'Q&A Sessions',
        'Live Streaming'
      ]
    },
    {
      icon: <FaChalkboardTeacher size={32} />,
      title: 'Workshops & Training',
      description: 'Hands-on learning experiences to develop new skills and knowledge.',
      features: [
        'Technical Workshops',
        'Soft Skills Training',
        'Interactive Labs',
        'Certification Opportunities'
      ]
    },
    {
      icon: <FaUsers size={32} />,
      title: 'Networking Events',
      description: 'Opportunities to connect with peers, mentors, and potential partners.',
      features: [
        'Meet & Greets',
        'Panel Discussions',
        'Social Mixers',
        'Speed Networking'
      ]
    },
    {
      icon: <FaHandshake size={32} />,
      title: 'Sponsor Exhibits',
      description: 'Discover innovative products and services from leading sponsors.',
      features: [
        'Product Demos',
        'Exclusive Offers',
        'Expert Consultations',
        'Giveaways & Prizes'
      ]
    },
    {
      icon: <FaNetworkWired size={32} />,
      title: 'Virtual Access',
      description: 'Participate remotely with our comprehensive virtual conference platform.',
      features: [
        'Live Streaming',
        'On-demand Content',
        'Virtual Networking',
        'Interactive Q&A'
      ]
    },
    {
      icon: <FaCalendarAlt size={32} />,
      title: 'Conference Schedule',
      description: 'Plan your experience with a detailed agenda of all sessions and events.',
      features: [
        'Session Tracks',
        'Speaker Timings',
        'Breakout Sessions',
        'Event Reminders'
      ]
    },
    {
      icon: <FaStar size={32} />,
      title: 'Awards & Recognition',
      description: 'Celebrating excellence and innovation within our community.',
      features: [
        'Innovation Awards',
        'Best Speaker',
        'Community Impact',
        'Peer Voting'
      ]
    },
    {
      icon: <FaComments size={32} />,
      title: 'Community Forums',
      description: 'Engage with fellow attendees and speakers before, during, and after the event.',
      features: [
        'Discussion Boards',
        'Topic Groups',
        'Resource Sharing',
        'Live Chat'
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8} className="fade-in">
              <h1 className="display-4 fw-bold mb-4">What We Offer</h1>
              <p className="lead">
                Explore the diverse sessions, workshops, and networking opportunities that make our conference stand out.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Offerings Grid */}
      <section className="py-8">
        <Container>
          <Row className="g-4">
            {offerings.map((item, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="h-100 hover-shadow">
                  <Card.Body className="text-center">
                    <div className="icon-wrapper">
                      {item.icon}
                    </div>
                    <Card.Title className="mt-3">{item.title}</Card.Title>
                    <Card.Text className="mb-4">
                      {item.description}
                    </Card.Text>
                    <ul className="list-unstyled text-start">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="mb-2">
                          <i className="bi bi-check-circle-fill text-primary me-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-8">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-4">Ready to Join Us?</h2>
              <p className="lead mb-4">
                Don’t miss out on an incredible experience. Register now or check the full schedule.
              </p>
              <Button as={Link} to="/register" variant="primary" size="lg" className="me-3">
                Register Now
              </Button>
              <Button as={Link} to="/schedule" variant="outline-primary" size="lg">
                View Schedule
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Services;
