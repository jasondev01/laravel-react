import { useState, useEffect } from 'react'
import useAuthContext from '../context/AuthContext';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import axios from '../api/axios';

const ResetPassword = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ password_confirmation, setPasswordConfirmation ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const [ status, setStatus ] = useState(null);
    const [ searchParams ] = useSearchParams();
    const { token } = useParams();

    const { csrf } = useAuthContext();

    useEffect(() => {
        setEmail(searchParams.get("email"));

    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await csrf();
        setErrors([]);
        setStatus(null);
        try {
            const response = await axios.post("/password-reset", { email, token, password, password_confirmation});
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
                                <div>
                                    <div className="bg-green-700 m-2 p-2 rounded text-white">
                                    <p>
                                        {status}
                                    </p>
                                    <Link to='/login'>
                                        Login Now!
                                    </Link>
                                    </div>
                                    
                                </div>
                            }
                            <div className="mb-10 text-center md:mb-16">
                                Add your new password. 
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <input 
                                        type="password" 
                                        name="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Password'
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
                                        {
                                            errors.password && 
                                            <span className='text-red-400 text-sm m-2 p-2'>
                                                { errors.password[0] }
                                            </span> 
                                        }
                                </div>
                                <div className="mb-4">
                                    <input 
                                        type="password" 
                                        name="password" 
                                        value={password_confirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        placeholder='Password'
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
                                        {
                                            errors.password && 
                                            <span className='text-red-400 text-sm m-2 p-2'>
                                                { errors.password[0] }
                                            </span> 
                                        }
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

export default ResetPassword
