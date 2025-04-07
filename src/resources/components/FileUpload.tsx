import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { parsePDF } from '../services/pdfUtils';
import { extractDataFromPDFText } from '../services/dataExtractor';
import { Bill } from '../interfaces/bill';
import { httpPost } from '../services/httpRequest';

interface FileProcessingStatus {
  name: string;
  success: boolean;
  data?: Bill;
  error?: string;
}

function FileUpload() {
  const [filesStatus, setFilesStatus] = useState<FileProcessingStatus[]>([]);
  const { t } = useTranslation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter(
      (f) => f.type === 'application/pdf',
    );
    const statusList: FileProcessingStatus[] = [];

    for (const file of validFiles) {
      try {
        const data = await parsePDF(file);
        const json = extractDataFromPDFText(data);
        statusList.push({ name: file.name, success: true, data: json });
      } catch (err) {
        statusList.push({
          name: file.name,
          success: false,
          error: err.message || 'Erro desconhecido',
        });
      }
    }

    setFilesStatus(statusList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const file of filesStatus) {
      if (file.success && file.data) {
        try {
          const response = await httpPost('billing', file.data);
          console.log(`✅ ${file.name}: enviado com sucesso`, response);
        } catch (error) {
          console.error(`❌ ${file.name}: erro no envio`, error);
        }
      }
    }
  };

  return (
    <Container className="mt-4">
      <h4>{t('general.upload-message')}</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="customFile" className="btn btn-primary">
            {filesStatus.length > 0
              ? 'Arquivos selecionados'
              : t('general.select-file')}
          </Form.Label>
          <Form.Control
            id="customFile"
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={filesStatus.every((f) => !f.success)}
        >
          {t('general.submit')}
        </Button>
      </Form>

      {/* Lista de status */}
      {filesStatus.map((file, index) => (
        <Card key={index} className="mt-3">
          <Card.Header>
            {file.name}{' '}
            {file.success ? (
              <Badge bg="success">Sucesso</Badge>
            ) : (
              <Badge bg="danger">Erro</Badge>
            )}
          </Card.Header>
          <Card.Body className="overflow-auto" style={{ maxHeight: '300px' }}>
            {file.success ? (
              <pre className="mb-0 small">
                {JSON.stringify(file.data, null, 2)}
              </pre>
            ) : (
              <Alert variant="danger" className="mb-0">
                {file.error}
              </Alert>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default FileUpload;
