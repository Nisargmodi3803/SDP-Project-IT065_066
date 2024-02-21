import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'
import AddCourse from './components/AddCourse'
import SearchCourse from './components/SearchCourse'
import AllCourses from './components/AllCourses'
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/addCourse' element={<AddCourse />} />
          <Route path='/searchCourse' element={<SearchCourse />} />
          <Route path='/showAllCourses' element={<AllCourses />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
