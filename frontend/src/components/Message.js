import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <Alert
      className='rounded'
      variant={variant}
      style={{ textAlign: 'center' }}
    >
      <h4>{children}</h4>
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
