import './index.css';
import './App.css';
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import NotFounds from './pages/NotFounds';
import Alert from './components/Alert';
import {useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import { useEffect } from 'react';
import {refreshToken} from './redux/actions/authActions';
import Header from './components/Header';
import Messages from './pages/Messages';
import Explore from './pages/Explore'
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { getPost } from './redux/actions/postAction';
import io from 'socket.io-client';
import { ALERT_TYPES } from './redux/actions/alertActions';
import SocketioClient from './SocketioClient';
import { getnotify } from './redux/actions/notifyActions';
import Conversation from './components/Conversation';


function App() {
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(refreshToken());
    const socket= io();
    dispatch({type :ALERT_TYPES.SOCKET, payload : socket})
    return ()=> socket.close();
  },[dispatch])

  useEffect(()=> {
    dispatch(getnotify(auth));
    dispatch(getPost(auth.token))

  },[auth.token,auth,dispatch])

  return (
    <div className="App">
      <Router>
        <Alert/>
        {auth.token &&<Header />}
        {auth.token  && <SocketioClient />}
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={auth.token ? <Home/> : <Login />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/message/:id" element={auth.token ? <Conversation/> : <Login />}/>
            <Route path="/message" element={auth.token ? <Messages/> : <Login />}/>
            <Route path="/explore" element={auth.token?<Explore/>: <Login />}/>
            <Route path="/profile/:id" element={auth.token? <Profile/>: <Login />}/>
            <Route path="/notification" element={auth.token? <Notifications/>:<Login />}/>
            <Route path="/post/:id" element={auth.token? <Post />: <Login />} />
            <Route path="*" element={<NotFounds />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
