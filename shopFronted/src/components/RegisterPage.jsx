import { react, useState } from 'react'

export default function RegisterPage({ onSwitch }){
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
      });
    
      const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
      });
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [id]: value
        }));
        // Clear error when user types
        if (errors[id]) {
          setErrors(prev => ({
            ...prev,
            [id]: ''
          }));
        }
      };
      const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };
    
        // Check required fields
        const requiredFields = ['firstname', 'lastname', 'username', 'email', 'password', 'confirmpassword'];
        requiredFields.forEach(field => {
          if (!formData[field].trim()) {
            newErrors[field] = 'This field is required';
            isValid = false;
          }
        });
    
        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
          isValid = false;
        }
    
        // Password match validation
        if (formData.password !== formData.confirmpassword) {
          newErrors.confirmpassword = 'Passwords do not match';
          isValid = false;
        }
    
        // Password length validation
        if (formData.password && formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          // Form is valid, proceed with registration
          try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                firstname: formData.firstname,
                lastname: formData.lastname,
                username: formData.username,
                email: formData.email,
                password: formData.password
              })
            });
      
            const data = await response.json();
            if (response.ok) {
              alert("✅ Registration successful!");
              onSwitch();
            } else {
              // Show error from server
              alert(data.message || '⚠️ Registration failed');
            }
      
          } catch (err) {
            console.error('❌ Error during registration:', err);
            alert('⚠️ Something went wrong. Check your network or backend.');
          }
        }
      };
    return (
        <form onSubmit={handleSubmit}>
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 lg:w-4/5'> 
           <h1 className='text-5xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient-x wave-text'>Welcome User ! </h1>
           <p className='font-medium text-lg text-gray-500  mt-4 rainbow-wave wave-3d'>Enter your details bellow</p>
           <div className='mt-8 '>
                <div className='flex '>
                    <div className='flex flex-col mx-2 w-1/2'>
                        <label for="firstname"  className='text-lg font-medium'>First Name <span>*</span></label>
                        <input 
                            id='firstname'
                            onChange={handleChange}
                            className='border-2 border-gray-100 rounded-xl  p-2 mt-1 bg-transparent'
                            placeholder='enter  your First Name ' 
                        />
                        {errors.firstname && <p className='text-red-600 text-xs mt-1'>{errors.firstname}</p>}
                    </div>
                    <div className='flex flex-col mx-2 w-1/2'>
                        <label for="lastname" className='text-lg font-medium'>Last Name <span>*</span></label>
                        <input 
                            id='lastname'
                            onChange={handleChange}
                            className=' w-full border-2 border-gray-100 rounded-xl  p-2 mt-1 bg-transparent'
                            placeholder='enter  your Last Name ' 
                        />
                        {errors.lastname && <p className='text-red-600 text-xs mt-1'>{errors.lastname}</p>}
                    </div>
                </div>
                <div className='flex '>
                    <div className='flex flex-col mx-2 w-1/2'>
                        <label for="username"  className='text-lg font-medium'>Username <span>*</span></label>
                        <input 
                            id='username'
                            onChange={handleChange}
                            className=' w-full border-2 border-gray-100 rounded-xl  p-2 mt-1 bg-transparent'
                            placeholder='enter  your UserName ' 
                        />
                        {errors.username && <p className='text-red-600 text-xs mt-1'>{errors.username}</p>}
                    </div>
                    <div className='flex flex-col mx-2 w-1/2'>
                        <label for="email"  className='text-lg font-medium'>Email <span>*</span></label>
                        <input 
                            id='email'
                            onChange={handleChange}
                            className=' w-full border-2 border-gray-100 rounded-xl  p-2 mt-1 bg-transparent'
                            placeholder='enter  your Email ' 
                        />
                        {errors.email && <p className='text-red-600 text-xs mt-1'>{errors.email}</p>}
                    </div>
                </div>
                <div className='flex '>
                    <div className='flex flex-col mx-2 w-1/2'>
                        <label for="password" className='text-lg font-medium'>password <span>*</span></label>
                        <input 
                            id='password'
                            onChange={handleChange}
                            className=' w-full border-2 border-gray-100 rounded-xl  p-2 mt-1 bg-transparent'
                            placeholder='enter  your password '
                            type='password'
                        />
                        {errors.password && <p className='text-red-600 text-xs mt-1'>{errors.password}</p>}
                    </div>
                    <div className='flex flex-col mx-2 w-1/2'>
                        <label for="confirmpassword" className='text-lg font-medium'>confirm password <span>*</span></label>
                        <input 
                            id='confirmpassword'
                            onChange={handleChange}
                            className=' w-full border-2 border-gray-100 rounded-xl  p-2 mt-1 bg-transparent'
                            placeholder='enter  your password '
                            type='password'
                        />
                        {errors.confirmpassword && <p className='text-red-600 text-xs mt-1'>{errors.confirmpassword}</p>}
                    </div>
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
                <p className='font-medium  texy-base'>have account ? </p>
                <button 
                    onClick={onSwitch}
                    className='text-violet-500 font-medium ml-2 cursor-pointer'
                    >
                    Sign in
                </button>
           </div>
            
        </div>
    </form>
    )
}