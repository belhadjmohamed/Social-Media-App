import React , {useEffect, useState} from 'react';
import '../styles/register.css';
import monimage from '../social_media_photo.jpg';
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {register} from '../redux/actions/authActions';
import {Link} from 'react-router-dom';

function Register() {
  const initialState = {username:'',fullname :'',email:'',password:'',confirmPassword:'', gender:'male'}

  const [userData , setuserData] = useState(initialState);
  const {username,fullname,email,password,confirmPassword,gender} = userData;
  
  const {auth,alert} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name,value} = e.target;
    setuserData({...userData, [name] : value})
  }

  useEffect(() => {
    if (auth.token){
      navigate('/');
    }
  },[auth.token,navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
  
   dispatch(register(userData))
  }

  return (
    <div className='Register-background'>
    <div className='Register'>
      <div className='Register-2' >
      <h1 className='Register-header'>My Social Network Site</h1>
      <div className='Register-3'>
      <img className='image-err-reg' src={monimage} alt='social-media' />
      <div className='Register-4'>
        <h1 className='Register-subheader'> Register </h1>
        <div >
          <form className='Register-dataform' onSubmit={handleSubmit}>
          <input style={{background : `${alert.fullname ? '#5003' : ' '}`}} className='register-input' type='text' name='fullname' value={fullname} onChange={handleChange} placeholder={alert.fullname? `${alert.fullname}`: 'your fullname'} />
      
          <input style={{background : `${alert.username ? '#5003' : ' '}`}}  className='register-input'type='text' name='username' value={username.toLocaleLowerCase().replace(/ /g,'')} onChange={handleChange} placeholder={alert.username? `${alert.username}`: 'your username'} />
         
          <input style={{background : `${alert.email ? '#5003' : ' '}`}} className='register-input' type='email' name='email' value={email} onChange={handleChange} placeholder={alert.email? `${alert.email}`: 'your email'} />
      
          <input style={{background : `${alert.password ? '#5003' : ' '}`}} className='register-input' type='password' name='password' value={password} onChange={handleChange} placeholder={alert.password? `${alert.password}`: 'your password'} />
         
          <input style={{background : `${alert.confirmPassword ? '#5003' : ' '}`}} className='register-input' type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} placeholder={alert.confirmPassword? `${alert.confirmPassword}`: 'Confirm your password'} />
        
          <select className='gender-register' name='gender' value={gender} onChange={handleChange} >
            <option value='male'>Male </option>
            <option value='female'> Female</option>
          </select>
          <div className='div-button-register'>
          <button className ='btn-register-submit' type='submit'>Register</button>
          <p className='login-here'> Already have an account <Link to={'/login'}> Login here </Link> </p>
          </div>
          </form>
        </div>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
