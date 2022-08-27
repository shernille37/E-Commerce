import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword, sort }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          <LinkContainer
            key={p + 1}
            to={
              !isAdmin
                ? keyword && sort
                  ? `/search/${keyword}/page/${p + 1}/sort/${sort}`
                  : keyword
                  ? `search/${keyword}/page/${p + 1}`
                  : `/page/${p + 1}`
                : `/admin/productlist/${p + 1}`
            }
          >
            <Pagination.Item active={p + 1 === page} activeLabel=''>
              {p + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
