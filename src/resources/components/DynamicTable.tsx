import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const DynamicCards = ({ data, columns }) => {
  return (
    <Container className="mt-4">
      {data.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {data.map((row, rowIndex) => (
            <Col key={rowIndex}>
              <Card className="h-100">
                <Card.Body>
                  {columns.map((col, colIndex) => (
                    <div key={colIndex} className="mb-2">
                      <strong>{col.header}:</strong> {row[col.accessor]}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center">No data found</div>
      )}
    </Container>
  );
};

export default DynamicCards;
