import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ThemeSelector from './ThemeSelector';
import React from 'react';
import LanguageSelector from './LanguageSelector';

function AppBar() {
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary glass">
      <Container>
        <Navbar.Brand href="/">{t('navbar.title')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/"> {t('navbar.home')} </Nav.Link>
            <Nav.Link href="/about"> {t('navbar.about')} </Nav.Link>
            <Navbar.Collapse className="justify-content-end">
              <ThemeSelector />
              <LanguageSelector />
            </Navbar.Collapse>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
