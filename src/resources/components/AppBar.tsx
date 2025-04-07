import { Container, Nav, Navbar, Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ThemeSelector from './ThemeSelector';
import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { FaGear } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { getAvailablePages } from '../constants/availablePages';

function AppBar() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const availablePages = getAvailablePages(t);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          {t('navbar.title')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {availablePages.map((page, idx) => (
              <Nav.Link key={idx} as={Link} to={page.path}>
                {page.name}
              </Nav.Link>
            ))}
          </Nav>
          <Button
            className="ms-auto d-flex align-items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <FaGear />
            {t('navbar.settings')}
          </Button>
        </Navbar.Collapse>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="justify-content-center">
            <Modal.Title className="w-100 text-center">
              {t('navbar.settings')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-center gap-4">
            <Form.Group className="w-100 text-center">
              <Form.Label>{t('navbar.theme')}</Form.Label>
              <ThemeSelector />
            </Form.Group>

            <Form.Group className="w-100 text-center">
              <Form.Label>{t('navbar.language')}</Form.Label>
              <LanguageSelector />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {t('navbar.close')}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
}

export default AppBar;
