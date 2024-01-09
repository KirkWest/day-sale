import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
            <a href="https://www.instagram.com/adamstown_early_learning/">
              <FontAwesomeIcon className="fa" icon={faInstagram} size="2x" />
            </a>
          </Col>
          <Col className="text-center">
            <a href="https://adamstownearlylearning.org.au/">ACELP Website</a>
          </Col>
          <Col className="text-center">
            <a href="https://www.facebook.com/AdamstownCELP/">
              <FontAwesomeIcon className="fa" icon={faFacebook} size="2x" />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;