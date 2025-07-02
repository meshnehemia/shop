import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterPage from '../components/RegisterPage'
function Auth() {
  const [showRegister, setShowRegister] = useState(false);
  const toggleForm = () => {
    setShowRegister(!showRegister);
  };
  return (
    <div className='flex w-full h-screen'>
        <div className='w-full flex items-center justify-center lg:w-1/2'>
        {showRegister ? (
          <RegisterPage onSwitch={toggleForm} />
        ) : (
          <LoginForm onSwitch={toggleForm} />
        )}
        </div>
        <div className='hidden lg:flex relative h-full w-1/2 items-center justify-center bg-gray-200'>
            <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin'></div>
            <div className='w-full absolute h-1/2 bg-white/10 bottom-0 backdrop-blur-lg'></div>
        </div>
    </div>
  )
}

export default Auth
