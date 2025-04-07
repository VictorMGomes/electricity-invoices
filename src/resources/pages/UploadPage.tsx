import React from 'react';
import { Container, Card } from 'react-bootstrap';
import FileUpload from '../components/FileUpload';

export default function BillPage() {
  return (
    <Container className="my-5">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h5" className="mb-3">
            Enviar Arquivo PDF
          </Card.Title>
          <FileUpload />
        </Card.Body>
      </Card>
    </Container>
  );
}
