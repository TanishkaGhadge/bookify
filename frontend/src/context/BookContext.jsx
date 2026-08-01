import { createContext, useContext, useState } from 'react';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [currentBook, setCurrentBook] = useState(null);

  // currentBook shape:
  // {
  //   title: string,
  //   chapters: [{ id, title, text }],
  //   format: 'PDF' | 'EPUB'
  // }

  return (
    <BookContext.Provider value={{ currentBook, setCurrentBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
}
