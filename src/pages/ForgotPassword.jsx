import { useState } from 'react'
import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';

const ForgotPassword = () => {
    const [ email, setEmail ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const [ status, setStatus ] = useState(null);
    const { csrf } = useAuthContext();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await csrf();
        setErrors([]);
        setStatus(null);
        // try {
        //     const response = await fetch('http://localhost:8000/forgot-password', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email }),
        //         credentials: 'include',
        //     });

        //     if (response) {
        //         const responseData = await response.json();
        //         setStatus(responseData.status);
        //     } else if (response.status === 422) {
        //         const errorData = await response.json();
        //         setErrors(errorData.errors);
        //     } else {
        //         throw new Error('Failed to submit');
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

        try {
            const response = await axios.post("/forgot-password", { email });
            setStatus(response.data.status);
        } catch(e) {
            console.log(e);
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }

    return (
        
        <section className='bg-[#f4f7ff] py-20 lg:py-[120px]'>
            <div className='container mx-auto'>
                <div className='-mx-4 flex flex-wrap'>
                    <div className="w-full px-4">
                        <div className="
                            relative 
                            mx-auto 
                            max-w-[525px] 
                            overflow-hidden 
                            rounded-lg 
                            bg-white 
                            py-16 
                            px-10 
                            text-center 
                            sm:px-12 
                            md:px-[60px]
                            "
                        >   
                            {
                                status && 
                                <div className="bg-green-700 m-2 p-2 rounded text-white">
                                    {status}
                                </div>
                            }
                            <div className="mb-10 text-center md:mb-16">
                                For your password? Let us know your email address and we will email you the password reset link.
                            </div>
                            <div className='mb-10 text-center md:mb-16'>Laraveller</div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Email'
                                        className='
                                            border-[#e9edf4]
                                            w-full
                                            rounded-md
                                            border
                                            bg-[#fcfdfe]
                                            py-3
                                            px-5 
                                            text-base text-body-color
                                            placeholder-[#acb6be]
                                            outline-none 
                                            focus:border-primary
                                            focus-visible:shadow-none
                                        '
                                    />
                                    <div className='flex'>
                                        {
                                            errors.email && 
                                            <span className='text-red-400 text-sm m-2 p-2'>
                                                { errors.email[0] }
                                            </span> 
                                        }
                                    </div>
                                </div>
                                
                                <div className="mb-10">
                                    <button 
                                        type='submit'
                                        className='
                                            w-full
                                            px-4
                                            py-3
                                            bg-indigo-500
                                            hover:bg-indogo-700
                                            rounded-md
                                            text-white
                                        '
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword
