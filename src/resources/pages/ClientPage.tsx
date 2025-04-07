import React from 'react';
import { Container, Card } from 'react-bootstrap';
import DynamicTable from '../components/DynamicTable';

export default function ClientPage() {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
  ];

  const data = [
    { id: 1, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 2, name: 'John Smith', email: 'john@example.com' },
  ];

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title as="h5" className="mb-3">
            Lista de Registros
          </Card.Title>
          <DynamicTable data={data} columns={columns} />
        </Card.Body>
      </Card>
    </Container>
  );
}
