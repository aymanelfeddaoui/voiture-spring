import React from 'react';

/** Bootstrap 5 n'a plus Jumbotron — équivalent atelier */
export function Jumbotron({ className = '', children }) {
  return <div className={`p-5 rounded-3 ${className}`}>{children}</div>;
}
