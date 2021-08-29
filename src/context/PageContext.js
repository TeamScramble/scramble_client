import React, { createContext, useState } from 'react';

const defaultPageInfo = {
  currentPage: '',
  dispatchCurrentPage: () => {},
};

export const PageContext = createContext(defaultPageInfo);

export const PageContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('main');
  const dispatchCurrentPage = pageName => {
    setCurrentPage(pageName);
  };

  return (
    <PageContext.Provider value={{ currentPage, dispatchCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};
