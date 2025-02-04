import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AddTask from './components/Addtask';
import EditTask from './components/EditTask';
import { PageWrapper } from './components/style';

const App=()=> {
  return (
    <div className="App">
   <PageWrapper square sx={{ pb: '1' }}>
        <BrowserRouter >
          <Routes>
              <Route path="/" element={ <Home />} />
              <Route path="/ajaypratap003/task-management-webapp" element={ <Home />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/task/:id/:statusId" element={<EditTask />} />
          </Routes>
        </BrowserRouter>
      </PageWrapper>
    </div>
  );
}

export default App;
