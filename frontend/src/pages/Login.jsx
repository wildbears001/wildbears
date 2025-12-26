// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [currentState, setCurrentState] = useState('Login');
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

//   const [name, setName] = useState('')
//   const [password, setPassword] = useState('')
//   const [email, setEmail] = useState('')
//   const [showPassword, setShowPassword] = useState(false)

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       if (currentState === 'Sign Up') {
//         const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
//         if (response.data.success) {
//           setToken(response.data.token)
//           localStorage.setItem('token', response.data.token)
//         } else {
//           toast.error(response.data.message)
//         }
//       } else {
//         const response = await axios.post(backendUrl + '/api/user/login', { email, password });
//         if (response.data.success) {
//           setToken(response.data.token)
//           localStorage.setItem('token', response.data.token)
//         } else {
//           toast.error(response.data.message)
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       navigate('/')
//     }
//   }, [token])

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//       <div className='inline-flex items-center gap-2 mb-2 mt-10 '>      <p className='prata-regular text-3xl '>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 text-gray-800' />     </div>

//       {currentState === 'Login' ? '' : (
//         <input 
//           onChange={(e) => setName(e.target.value)} 
//           value={name} 
//           type="text" 
//           className='w-full px-3 py-2 border border-gray-800' 
//           placeholder='Name' 
//           required 
//         />
//       )}

//       <input 
//         onChange={(e) => setEmail(e.target.value)} 
//         value={email} 
//         type="email" 
//         className='w-full px-3 py-2 border border-gray-800' 
//         placeholder='Email' 
//         required 
//       />

//       <div className='w-full relative'>
//         <input 
//           onChange={(e) => setPassword(e.target.value)} 
//           value={password} 
//           type={showPassword ? 'text' : 'password'} 
//           className='w-full px-3 py-2 border border-gray-800' 
//           placeholder='Password' 
//           required 
//         />
//         <span 
//           onClick={() => setShowPassword(!showPassword)} 
//           className='absolute right-3 top-2/4 transform -translate-y-1/2 text-sm cursor-pointer text-gray-600 select-none'
//         >
//           {showPassword ? 'Hide' : 'Show'}
//         </span>
//       </div>
//      <div className='w-full flex justify-between text-sm mt-[-8px]'>
//         <p className='cursor-pointer'>Forgot password?</p>
//         {
//           currentState === 'Login'
//             ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
//             : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login here</p>
//         }     </div>

//       <button className='bg-black text-white font-light px-8 py-2 mt-4'>
//         {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
//       </button>
//     </form>
//   )
// }

// export default Login



import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [currentState, setCurrentState] = useState('Login')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [loading, setLoading] = useState(false)

  /* ================= RESET SIGNUP STATE ================= */
  const resetSignupFlow = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setOtp('')
    setOtpSent(false)
    setOtpVerified(false)
  }

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    if (!email) return toast.error("Enter email first")

    try {
      setLoading(true)
      const res = await axios.post(`${backendUrl}/api/otp/send`, { email })
      if (res.data.success) {
        setOtpSent(true)
        toast.success("OTP sent to your email")
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP")

    try {
      setLoading(true)
      const res = await axios.post(`${backendUrl}/api/otp/verify`, { email, otp })
      if (res.data.success) {
        setOtpVerified(true)
        toast.success("OTP verified successfully")
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ================= SUBMIT ================= */
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (currentState === 'Sign Up') {
      if (!otpVerified) {
        toast.error("Verify OTP first")
        return
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return
      }

      try {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password
        })

        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        } else {
          toast.error(res.data.message)
        }
      } catch (err) {
        toast.error(err.message)
      }
    } else {
      try {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password
        })

        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        } else {
          toast.error(res.data.message)
        }
      } catch (err) {
        toast.error(err.message)
      }
    }
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96
                 m-auto mt-16 gap-4 text-gray-800"
    >
      <h2 className="text-3xl font-semibold text-[#6B4E2E] mb-4">
        {currentState}
      </h2>

      {/* ================= SIGN UP FLOW ================= */}
      {currentState === 'Sign Up' && (
        <>
          {/* NAME */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 border border-[#6B4E2E]/40 rounded-md"
            required
          />

          {/* EMAIL */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-[#6B4E2E]/40 rounded-md"
            required
          />

          {/* OTP STEP */}
          {!otpVerified && (
            <>
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full border border-[#6B4E2E]
                             text-[#6B4E2E] py-2 rounded-md
                             hover:bg-[#6B4E2E] hover:text-white transition"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              ) : (
                <>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2 border border-[#6B4E2E]/40 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={loading}
                    className="w-full bg-[#6B4E2E] text-white py-2 rounded-md"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </>
              )}
            </>
          )}

          {/* PASSWORDS (ONLY AFTER OTP VERIFIED) */}
          {otpVerified && (
            <>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border border-[#6B4E2E]/40 rounded-md"
                required
              />

              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-[#6B4E2E]/40 rounded-md"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#6B4E2E] text-white py-2 rounded-md
                           tracking-wide"
              >
                Sign Up
              </button>
            </>
          )}
        </>
      )}

      {/* ================= LOGIN FLOW ================= */}
      {currentState === 'Login' && (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-[#6B4E2E]/40 rounded-md"
            required
          />

          <div className="w-full relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-2 border border-[#6B4E2E]/40 rounded-md"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2/4 -translate-y-1/2
                         text-sm cursor-pointer text-gray-500"
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6B4E2E] text-white py-2 rounded-md
                       tracking-wide"
          >
            Sign In
          </button>
        </>
      )}

      {/* TOGGLE */}
      <div className="w-full text-sm text-center mt-2">
        {currentState === 'Login' ? (
          <span
            onClick={() => {
              setCurrentState('Sign Up')
              resetSignupFlow()
            }}
            className="cursor-pointer text-[#6B4E2E]"
          >
            Create an account
          </span>
        ) : (
          <span
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer text-[#6B4E2E]"
          >
            Login here
          </span>
        )}
      </div>
    </form>
  )
}

export default Login
