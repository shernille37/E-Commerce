import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const category = params.get('category') || '';

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() && category) {
      navigate(`/?search=${keyword}&category=${category}`);
    } else if (keyword.trim()) {
      navigate(`/?search=${keyword}`);
    } else navigate('/');
    setKeyword('');
  };

  return (
    <Form onSubmit={submitHandler} className='d-inline-flex'>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
