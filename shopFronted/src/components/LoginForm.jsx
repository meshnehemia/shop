import { react , useState} from 'react'
import { useNavigate } from 'react-router-dom'
export default function LoginForm({ onSwitch }){
    const [loginForm,setLoginForm] = useState({
        email:'',
        password:''
    });
    const [loginError, setLoginError] = useState({
        email:'',
        password:''
    });
    const handleLoginChange=(e)=>{
        const { id, value } = e.target;
        setLoginForm(prev=>({...prev, [id]:value}));
        if(loginError[id]){
            setLoginError(prev =>({...prev, [id]:""}))
        }
    };
    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...loginError };
    
        // Check required fields
        const requiredFields = ['email', 'password'];
        requiredFields.forEach(field => {
          if (!loginForm[field].trim()) {
            newErrors[field] = 'This field is required';
            isValid = false;
          }
        });
    
        // Email validation
        if (loginForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
          newErrors.email = 'Please enter a valid email';
          isValid = false;
        }
    
        // Password length validation
        if (loginForm.password && loginForm.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
          isValid = false;
        }
    
        setLoginError(newErrors);
        return isValid;
      };
      const handleSubmit =async (e) => {
        e.preventDefault();
        if (validateForm()) {
          // Form is valid, proceed with registration
          try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(loginForm)
            });
      
            const data = await response.json();
      
            if (response.ok) {
            //   console.log('✅ Login successful:', data);
              localStorage.setItem('token', data.token); // Save token
              alert("✅ Logged in successfully!");

      
              // You can now redirect or start socket connection
              window.location.href = '/dashboard';
            } else {
              alert(data.message || "⚠️ Login failed");
            }
      
          } catch (err) {
            console.error("❌ Error logging in:", err);
            alert("⚠️ Something went wrong. Check your network or backend.");
          }
        }
      };
    
    return (
        <form onSubmit={handleSubmit} className='flex justify-center items-center'>
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 lg:w-4/5'> 
           <h1 className='text-5xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient-x wave-text'>Welcome Back ! </h1>
           <p className='font-medium text-lg text-gray-500  mt-4 rainbow-wave wave-3d'>Enter enter your login information</p>
           <div className='mt-8 '>
                <div>
                    <label htmlFor="email" className='text-lg font-medium'>Email</label>
                    <input 
                        id='email'
                        onChange={handleLoginChange}
                        className=' w-full border-2 border-gray-100 rounded-xl  p-4 mt-1 bg-transparent'
                        placeholder='enter  your Email ' 
                     />
                     {loginError.email && <p className='text-red-600 text-xs mt-1'>{loginError.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className='text-lg font-medium'>password </label>
                    <input 
                        id='password'
                        onChange={handleLoginChange}
                        className=' w-full border-2 border-gray-100 rounded-xl  p-4 mt-1 bg-transparent'
                        placeholder='enter  your password '
                        type='password'
                     />
                     {loginError.password && <p className='text-red-600 text-xs mt-1'>{loginError.password}</p>}
                     
                </div>
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input type="checkbox" name="" id="remember" />
                        <label className='ml-2 font-medium text-base' htmlFor="remember">remember for 30 days</label>
                    </div>
                    <button className='ml-2 font-medium text-violet-500'>forget password</button>
                </div>
                <div className='mt-8 flex flex-col gap-y-4 '>
                    <button type='submit' className='hover:animate-pulse active:scale-[.90] active:duration-75 transition-all bg-violet-500 hover:scale-[1.01] ease-in-out text-white font-bold py-3 rounded-xl'>sign in </button>
                    <button className='hover:animate-pulse py-3 border-2 rounded-xl border-gray-100 flex items-center justify-center gap-2 active:scale-[.90] active:duration-75 transition-all hover:scale-[1.01] ease-in-out'>  
                    <svg width="30" height="30" 
                    data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                    fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0">
                    </g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"></path>
                        <path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"></path>
                        <path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"></path>
                        <polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"></polygon>
                        <path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435">
                        </path>
                        <polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"></polygon>
                        <path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"></path></g></svg>sign in with google</button>
                </div>
           </div>
           <div className='mt-8 flex justify-center items-center'>
                <p className='font-medium  texy-base'> don't have account ? </p>
                <button 
                    onClick={onSwitch}
                    className='text-violet-500 font-medium ml-2 cursor-pointer'
                    >
                    Sign up
                </button>
           </div>
            
        </div>
        </form>
    )
}