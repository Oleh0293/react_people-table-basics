import React, { useEffect, useState } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getPeople } from './api';
import { Person } from './types';
import { HeadOfTable } from './components/HeadOfTable/HeadOfTable';
import { Navigation } from './components/Navigation/Navigation';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <div data-cy="app">
      <HeadOfTable />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<h1 className="title">Home Page</h1>} />
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
              <Route
                path="people"
                element={<PeoplePage people={people} setPeople={setPeople} />}
              >
                <Route
                  path=":personSlug"
                  element={<PeoplePage people={people} setPeople={setPeople} />}
                />
              </Route>
              <Route path="home" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
