import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just console log here, but replace with API call or mail handler
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <FaPhone size={24} />,
      title: 'Phone',
      content: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: <FaEnvelope size={24} />,
      title: 'Email',
      content: 'info@yourconference.in',
      link: 'mailto:info@yourconference.in'
    },
    {
      icon: <FaMapMarkerAlt size={24} />,
      title: 'Address',
      content: '123 Conference Road, New Delhi, India 110001',
      link: 'https://goo.gl/maps/9aWq9XR9fL52' // link to New Delhi location on Google Maps
    },
    {
      icon: <FaClock size={24} />,
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: null
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8} className="fade-in">
              <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
              <p className="lead">
                Reach out to our team anytime. We’re here to answer your questions and help you get the most out of the event.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-8">
        <Container>
          <Row className="g-4">
            {contactInfo.map((info, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="h-100 hover-shadow">
                  <Card.Body className="text-center">
                    <div className="icon-wrapper mb-3">
                      {info.icon}
                    </div>
                    <Card.Title>{info.title}</Card.Title>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-decoration-none text-dark"
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.content}
                      </a>
                    ) : (
                      <Card.Text>{info.content}</Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="bg-light py-8">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="text-center mb-4">Send Us a Message</h2>
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Your email"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Subject</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Message subject"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group className="mb-4">
                          <Form.Label>Message</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Your message"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} className="text-center">
                        <Button type="submit" variant="primary" size="lg">
                          Send Message
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3810.534888642047!2d80.63199531528914!3d16.506174788909535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fd618cf92a8b%3A0x204d94fef3e3d3a6!2sVijayawada%2C%20Andhra%20Pradesh%20520401!5e0!3m2!1sen!2sin!4v1696603069209!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  title="Conference Location - Vijayawada"
/>

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
