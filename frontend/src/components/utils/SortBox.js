import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown, Card, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SortBox = () => {
  const [params] = useSearchParams();
  const search = params.get('search') || '';
  const category = params.get('category') || '';
  const pageNumber = params.get('page') || 1;

  const [link, setLink] = useState('');

  useEffect(() => {
    if (search && category) {
      setLink(`/?search=${search}&category=${category}&page=${pageNumber}`);
    } else if (search) setLink(`/?search=${search}&page=${pageNumber}`);
    else if (category) setLink(`/?category=${category}&page=${pageNumber}`);
    else setLink(`/?page=${pageNumber}`);
  }, [params]);

  return (
    <Dropdown autoClose='inside' drop='down'>
      <Dropdown.Toggle variant='success' className='rounded'>
        Sort by Price
      </Dropdown.Toggle>

      <Dropdown.Menu className='p-0'>
        <Dropdown.Item as='div' className='p-0'>
          <Card>
            <Card.Body>
              <Card.Title className='text-center text-success text-uppercase'>
                <strong>Sort by Price</strong>
              </Card.Title>
              <Row className='justify-content-center align-items-center'>
                <Col md={6} sm={12} className='my-2'>
                  <LinkContainer
                    to={`${link ? `${link}&sort=asc` : '?sort=asc'}`}
                  >
                    <Button className='w-100 btn-sm bg-success'>
                      <i className='fa-solid fa-arrow-up'>ASCENDING</i>
                    </Button>
                  </LinkContainer>
                </Col>
                <Col md={6} sm={12}>
                  <LinkContainer
                    to={`${link ? `${link}&sort=desc` : '?sort=desc'}`}
                  >
                    <Button className='w-100 btn-sm bg-success'>
                      <i className='fa-solid fa-arrow-down'>DESCENDING</i>
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortBox;
