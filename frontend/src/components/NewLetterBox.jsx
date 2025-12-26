import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


const NewLetterBox = () => {
   
     const form = useRef();


    const sendEmail = (e) => {
    e.preventDefault();

    emailjs 

     const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();
    emailjs

      .sendForm('service_1rgxjnx', 'template_uvw82mq', form.current, {
        publicKey: 'ED9P8DOenZXg7wLbq',
      })
      .then(
        () => {
          toast.success('SUCCESS!');
          
        },
        (error) => {
          toast.error('FAILED...', error.text);
        },
      );
  };
    
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>

        <p className='text-gary-400 mt-3'>
            Be the part  of <strong>HEVEN</strong> and Avail Unlimited Offers!!
        </p>

        <form  ref={form} onSubmit={sendEmail} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email"  name='Email' placeholder='Enter Your Mail' className='w-full sm:flex-1 outline-none' required/>
            <button type='submit'  className='bg-black text-white text-xs px-10 py-4 '>SUBSCRIBE</button>
        </form>
      
    </div>
  )
}
}
export default NewLetterBox 
