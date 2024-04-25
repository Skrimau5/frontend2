import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login/login'
import PreLogin from './Components/Login/PreLogin'
import PinLogin from './Components/Login/LoginPin'
import Register from './Components/Register/Register'
import Home from './Components/Home/home'
import Watch from './Components/Watch/watch'
import WatchVideos from './Components/Watch/WatchVideos'
import CreateNewProfile from './Components/Administration/AdministrationKids/Create/Create'
import AdministrationCollection from './Components/Administration/AdministrationCollections/AdiministrationCollection'
import ManageCollection from './Components/Administration/AdministrationCollections/ManageVideos'
import CreateCollection from './Components/Administration/AdministrationCollections/Create/Create'
import UpdateCollection from './Components/Administration/AdministrationCollections/Update/Update'
import CreateEditProfile from './Components/Administration/AdministrationKids/Update/Update'
import CreateNewVideo from './Components/Administration/AdministrationPlaylist/Create/Create'
import EditVideo from './Components/Administration/AdministrationPlaylist/Update/Update'
import AdministrationKids from './Components/Administration/AdministrationKids/AdministrationKids'
import AdministrationPlaylist from './Components/Administration/AdministrationPlaylist/AdministrationPlaylist'
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/> } />
          <Route path="/loginpin" element={<PinLogin/> } />
          <Route path="/prelogin" element={<PreLogin/> } />
          <Route path="/home" element={<Home/>}/>
          <Route path="/watch" element={<Watch/>}/>
          <Route path="/watchVideos" element={<WatchVideos/>}/>
          <Route path="/createNewProfile" element={<CreateNewProfile/>}/>
          <Route path="/createCollection" element={<CreateCollection/>}/>
          <Route path="/CreateEditProfile" element={<CreateEditProfile/>}/>
          <Route path="/createNewVideo" element={<CreateNewVideo/>}/>
          <Route path="/editVideo" element={<EditVideo/>}/>
          <Route path="/adminKids" element={<AdministrationKids/>}/>
          <Route path="/editCollection" element={<UpdateCollection/>}/>
          <Route path="/adminPlaylist" element={<AdministrationPlaylist/>}/>
          <Route path="/adminCollection" element={<AdministrationCollection/>}/>
          <Route path="/manageCollection" element={<ManageCollection/>}/>
      </Routes>
    </div>
  );
}

export default App;
