import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { text: 'About Us', path: '/about' },
        { text: 'Services', path: '/services' },
        { text: 'Contact', path: '/contact' },
        { text: 'Careers', path: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', path: '/blog' },
        { text: 'Documentation', path: '/docs' },
        { text: 'Support', path: '/support' },
        { text: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', path: '/privacy' },
        { text: 'Terms of Service', path: '/terms' },
        { text: 'Cookie Policy', path: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-white py-5 mt-auto">
      <Container>
        <Row>
          {/* Company Info */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3">LOGO</h5>
            <p className="mb-3">
              Making technology accessible to everyone. We provide innovative solutions
              to help businesses grow and succeed in the digital age.
            </p>
            <div className="d-flex gap-3">
              <Button variant="light" size="sm" className="rounded-circle p-2">
                <FaFacebook />
              </Button>
              <Button variant="light" size="sm" className="rounded-circle p-2">
                <FaTwitter />
              </Button>
              <Button variant="light" size="sm" className="rounded-circle p-2">
                <FaLinkedin />
              </Button>
              <Button variant="light" size="sm" className="rounded-circle p-2">
                <FaInstagram />
              </Button>
            </div>
          </Col>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <Col key={section.title} xs={6} md={2} className="mb-4 mb-md-0">
              <h5 className="mb-3">{section.title}</h5>
              {section.links.map((link) => (
                <div key={link.text} className="mb-2">
                  <Link
                    to={link.path}
                    className="text-white text-decoration-none"
                  >
                    {link.text}
                  </Link>
                </div>
              ))}
            </Col>
          ))}
        </Row>

        {/* Copyright */}
        <Row className="mt-5 pt-3 border-top border-light">
          <Col>
            <p className="text-center mb-0">
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
