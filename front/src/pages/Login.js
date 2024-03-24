import React , {useState,useEffect} from 'react';
import '../styles/login.css'
import monimage from '../social_media_photo.jpg';
import {login} from '../redux/actions/authActions';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate , Link} from 'react-router-dom';


const Login = () => {
  const initialState = {email : '' ,password:''}
  const navigate = useNavigate();
  const [userData , setUserData] = useState(initialState);
  const dispatch = useDispatch();
  const {email,password} = userData;
  const {auth} = useSelector(state => state);

  const handleChange = (e) => {
    const  {name,value} = e.target ; 
    setUserData({...userData , [name]: value})
  }

  useEffect(() => {
    if (auth.token){
      navigate('/');
    }
  },[auth.token,navigate])

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await dispatch(login(userData));
  }
  
  return (
    <div className='login-background'>
    <div className='login'>
      <div className='login-2' >
      <h1 className='login-header'>My Social Network Site</h1>
      <div className='login-3'>
      <img className='image-err' src={monimage} alt='social-media' />
      <div className='login-4'>
        <h1 className='login-subheader'> Login </h1>
        <p className='login-p'>To keep connected with us please login with your email address and password</p>
        <div >
          <form className='login-dataform' onSubmit={handleSubmit}>
          <input className='login-input' type='email' name='email' value={email} onChange={handleChange} placeholder='your email' />
          <input className='login-input' type='password' name='password' value={password} onChange={handleChange} placeholder='your password' />
          <div className='div-button'>
          <button className='btn-login-submit' type='submit'>Login</button>
          <Link to={'/register'}><button type="button" className='createaccount_login'>  Create account</button> </Link>
          </div>
          </form>
        </div>
      </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Login;
