import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { httpGet } from '../services/httpRequest';

export default function DashboardPage() {
  const [bills, setBills] = useState<[]>([]);

  useEffect(() => {
    httpGet('billing').then((response) => {
      console.log(response);
      setBills(response);
    });
  }, []);

  return (
    <Container className="my-5">
      <Row>
        {bills.map((bill, index) => (
          <Col md={6} lg={4} key={bill.id || index} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="mb-3">Registro #{index + 1}</Card.Title>
                {Object.entries(bill).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
