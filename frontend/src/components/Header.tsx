import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => (
  <Helmet>
    <title>Todos</title>
    <style>{`
      .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60px;
        background-color: #f5f5f5;
      }
    `}</style>
  </Helmet>
);

export default Header;