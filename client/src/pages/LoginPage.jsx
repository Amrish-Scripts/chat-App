import React, {useContext, useState} from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState , setCurrState] = useState("Sign up")
  const [fullName , setFullName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [bio , setBio] = useState("")
  const [isDataSubmitted , setIsDataSubmitted] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const {login} = useContext(AuthContext);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && !email.includes(' ');
  };

  const isFormValid = () => {
    if (currState === "Login") {
      return isValidEmail(email) && password.length > 0;
    }
    if (currState === "Sign up" && !isDataSubmitted) {
      return fullName.trim().length > 0 && isValidEmail(email) && password.length > 0 && isAgreed;
    }
    if (currState === "Sign up" && isDataSubmitted) {
      return bio.trim().length > 0;
    }
    return false;
  };



  const onSubmitHandler = (event) =>{
    event.preventDefault();

    if(currState === "Sign up" && !isDataSubmitted){
      setIsDataSubmitted(true)
      return ;
    }

    login(currState === "Sign up" ? "signup" : "login", {
      
      fullName,
      email,
      password,
      bio
});

  }
  
  

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/*------------------left --------------*/}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />


      {/*------------------right --------------*/}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[350px] max-w-[90vw]'>
      
      <h2 className='font-medium text-2xl flex justify-between items-center'>
        {currState} 
        {isDataSubmitted &&  <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />

        }
        
        
        </h2>
        {currState === "Sign up" && !isDataSubmitted &&(

          <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
           type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder="Full Name " required />

        )}

        {!isDataSubmitted && (
          <>
          <div className='flex flex-col gap-1'>
            <input onChange={(e)=>setEmail(e.target.value)} value={email}
             type="email" placeholder='Email Address' required 
             className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
               email.length > 0 && !isValidEmail(email) 
                 ? 'border-red-500 focus:ring-red-500' 
                 : 'border-gray-500 focus:ring-indigo-500'
             }`} />
            {email.length > 0 && !isValidEmail(email) && (
              <span className='text-red-400 text-xs'>Please enter a valid email address</span>
            )}
          </div>

           <input onChange={(e)=>setPassword(e.target.value)} value={password}
           type="password" placeholder='password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' />
          </>

        )}

        {
          currState === "Sign up" && isDataSubmitted && (
            <textarea onChange={(e)=> setBio(e.target.value)} value={bio}
             rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' placeholder='provide a short bio ' required></textarea>

          )
        }

        <button 
          type='submit' 
          disabled={!isFormValid()}
          className={`py-3 rounded-md transition-all ${
            isFormValid() 
              ? 'bg-gradient-to-r from-purple-400 to-violet-600 text-white cursor-pointer hover:opacity-90' 
              : 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-60'
          }`}
        >
           { currState =="Sign up" ? "Create Account" : "Login Now"}
        </button>

        {currState === "Sign up" && !isDataSubmitted && (
          <div className='flex items-start gap-2 text-sm text-gray-500'>
            <input 
              type="checkbox" 
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className='cursor-pointer mt-1'
            />
            <p>
              Agree to the terms of the use of the privacy policy
            </p>
          </div>
        )}

        <div className='flex flex-col gap-2'>

          {currState === "Sign up" ? (

            <p className='text-sm text-gray-600'> Already have an account ? <span onClick  ={()=>{setCurrState("Login"); setIsDataSubmitted(false) }}className='font-medium text-violet-500 cursor-pointer'>Login Here </span> </p>
          ) : (

            <p className='text-sm text-gray-600'>
              Create An account <span onClick={()=>setCurrState("Sign up")} className='font-medium text-violet-500 cursor-pointer'> Click here </span>
            </p>
          )}

        </div>
      
      </form>
    
    </div>
  )
}

export default LoginPage
