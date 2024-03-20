import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import AdminPlaylist from './Components/AdminPlaylist/AdminPlaylist'
import AdminProfile from './Components/AdminProfile/AdminProfile'
import View from './Components/View/View'
import Home from './Components/Home/Home'
import CreateVideo from './Components/AdminPlaylist/CreateVideo/CreateVideo'
import CreateProfile from './Components/AdminProfile/CreateProfile/CreateProfile'
import EditVideo from './Components/AdminPlaylist/EditVideo/EditVideo'
import EditProfile from './Components/AdminProfile/EditProfile/EditProfile'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/> } />
          <Route path="/view" element={<View/>}/>
          <Route path="/adminPlayList" element={<AdminPlaylist/>}/>
          <Route path="/adminProfile" element={<AdminProfile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/createProfile" element={<CreateProfile/>}/>
          <Route path="/createVideo" element={<CreateVideo/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path="/editVideo" element={<EditVideo/>}/>
          <Route path="/home" element={<Home/>}/>
          
      </Routes>
    </div>
  );
}

export default App;