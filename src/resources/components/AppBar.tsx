import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ThemeSelector from './ThemeSelector';
import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { FaGear } from 'react-icons/fa6';

function AppBar() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">{t('navbar.title')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/"> {t('navbar.home')} </Nav.Link>
            <Nav.Link href="/about">{t('navbar.about')} </Nav.Link>
          </Nav>
          <Button
            className="ms-auto"
            onClick={() => setShowModal(true)}
          >
            <FaGear /> {t('navbar.settings')}
          </Button>
        </Navbar.Collapse>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{t('navbar.settings')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ThemeSelector />
            <LanguageSelector />
          </Modal.Body>
          <Modal.Footer>
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
