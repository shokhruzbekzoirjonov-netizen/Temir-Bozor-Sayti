import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Col } from 'reactstrap';

const MovieCard = ({ movie }) => {
  return (
    <Col sm="12" md="6" lg="4" className="mb-4">
      <Card className="h-100 shadow-sm">
        <CardImg
          top
          width="100%"
          src={movie.poster || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={movie.title || movie.name}
          style={{ height: '350px', objectFit: 'cover' }}
        />
        <CardBody className="d-flex flex-column justify-content-between">
          <CardTitle tag="h5">{movie.title || movie.name}</CardTitle>
          <CardText className="text-muted">
            {movie.overview ? movie.overview.substring(0, 100) + '...' : 'Tavsif mavjud emas.'}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MovieCard;