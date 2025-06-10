import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaHandshake, FaLightbulb, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8} className="fade-in">
              <h1 className="display-4 fw-bold mb-4">About the Conference</h1>
              <p className="lead">
                Our annual conference brings together industry leaders, innovators, and professionals to share knowledge,
                inspire collaboration, and shape the future of technology and business.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-8">
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="h-100 hover-shadow">
                <Card.Body>
                  <h2 className="h3 mb-4">Our Mission</h2>
                  <p className="lead mb-4">
                    To create a dynamic platform where professionals can learn, network, and collaborate to drive innovation
                    and growth in their fields.
                  </p>
                  <p>
                    We are committed to delivering inspiring talks, interactive workshops, and meaningful connections
                    that empower attendees to take their skills and careers to the next level.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 hover-shadow">
                <Card.Body>
                  <h2 className="h3 mb-4">Our Vision</h2>
                  <p className="lead mb-4">
                    To be the premier event for professionals seeking to stay ahead of industry trends, foster innovation,
                    and build lasting relationships.
                  </p>
                  <p>
                    We aim to continuously evolve the conference experience to meet the changing needs of our diverse community,
                    creating value for attendees, speakers, and partners alike.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="bg-light py-8">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that define our conference culture
            </p>
          </div>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="h-100 hover-shadow">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaUsers size={32} />
                  </div>
                  <Card.Title>Community</Card.Title>
                  <Card.Text>
                    We foster an inclusive and supportive environment where all voices are heard and valued.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 hover-shadow">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaHandshake size={32} />
                  </div>
                  <Card.Title>Collaboration</Card.Title>
                  <Card.Text>
                    We encourage partnerships and networking that lead to meaningful opportunities and shared success.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 hover-shadow">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaLightbulb size={32} />
                  </div>
                  <Card.Title>Innovation</Card.Title>
                  <Card.Text>
                    We celebrate creativity and fresh ideas that challenge the status quo and drive progress.
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
                  <Card.Title>Excellence</Card.Title>
                  <Card.Text>
                    We strive to deliver a top-tier conference experience with high-quality content and flawless execution.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-8">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Meet the Organizers</h2>
            <p className="section-subtitle">
              The passionate team behind the event
            </p>
          </div>
          <Row className="g-4">
            {[
              {
                name: 'John Doe',
                position: 'Conference Chair',
                image: '/team/john-doe.jpg',
                bio: 'A visionary leader with over 20 years organizing large-scale industry events.'
              },
              {
                name: 'Jane Smith',
                position: 'Program Director',
                image: '/team/jane-smith.jpg',
                bio: 'Expert in curating impactful content and engaging speaker lineups.'
              },
              {
                name: 'Mike Johnson',
                position: 'Operations Manager',
                image: '/team/mike-johnson.jpg',
                bio: 'Ensures smooth event logistics and an outstanding attendee experience.'
              }
            ].map((member, index) => (
              <Col key={index} md={4}>
                <Card className="h-100 hover-shadow">
                  <Card.Img
                    variant="top"
                    src={member.image}
                    alt={member.name}
                    className="object-fit-cover"
                    style={{ height: '300px' }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {member.position}
                    </Card.Subtitle>
                    <Card.Text>{member.bio}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
