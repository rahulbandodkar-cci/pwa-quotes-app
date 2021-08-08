import React from "react";
import './authoritem.scss';

const AuthorItem = ({ author }) => {
  return (
    <div className='col-lg-4 p-2' >
      <a className="author-item" href={`/quotes?author=${author}`} >
        {author}
      </a>
    </div>
  );
}

export default AuthorItem;
