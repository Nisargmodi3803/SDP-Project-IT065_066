import './App.css';
import Nav from './components/nav';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Profile from './components/Profile';
import AllCourses from './components/AllCourses'
import EnrollCourses from './components/EnrollCourses'
import SearchCourse from './components/searchCourse';
import VideoPlayerPage from './components/VideoPlayerPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/logout' element={<h1>Logout component</h1>}></Route>
          <Route path='/allCourses' element={<AllCourses/>}></Route>
          <Route path='/notes' element={<h1>Notes component</h1>}></Route>
          <Route path='/enrollments' element={<EnrollCourses/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/searchCourse' element={<SearchCourse/>}/>
          <Route path='/video/:videoId' element={<VideoPlayerPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
