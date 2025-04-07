import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FileUpload from '../components/FileUpload';

export default function BillPage() {
  const { t } = useTranslation();
  return (
    <Container className="my-5">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h5" className="mb-3">
            {t('general.upload-title')}
          </Card.Title>
          <FileUpload />
        </Card.Body>
      </Card>
    </Container>
  );
}
