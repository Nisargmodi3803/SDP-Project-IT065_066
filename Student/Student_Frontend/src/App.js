import './App.css';
import Nav from './components/nav';
import Register from './components/register';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup'
import privateComponent from './components/privateComponent';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Profile from './components/Profile';
import AllCourses from './components/AllCourses'
import EndrollCourses from './components/EndrollCourses'
import Lectures from './components/Lectures';
import SearchCourse from './components/searchCourse';

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
          <Route path='/endrollments' element={<EndrollCourses/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/endrollments/watch' element={<Lectures />} />
          <Route path='/searchCourse' element={<SearchCourse/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
