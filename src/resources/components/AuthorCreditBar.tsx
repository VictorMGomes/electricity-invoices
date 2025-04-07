import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function AuthorCreditBar() {
  const { t } = useTranslation();
  return (
    <Navbar fixed="bottom" className="shadow-sm">
      <Container className="d-flex flex-column flex-sm-row justify-content-center align-items-center text-center w-100">
        <Navbar.Text className="text-muted mb-1 mb-sm-0">
          <small>{t('general.credit-message')}</small>
        </Navbar.Text>
        <Nav className="ms-sm-2">
          <Nav.Link
            href="https://victormgomes.net"
            target="_blank"
            rel="noopener noreferrer"
            className="p-0 px-2 text-muted"
          >
            <small>Victor M. Gomes</small>
          </Nav.Link>
          <Nav.Link
            href="mailto:info@victormgomes.net"
            className="p-0 px-2 text-muted"
          >
            <small>info@victormgomes.net</small>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AuthorCreditBar;
