import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
                // Also optionally save role if your app needs it
                localStorage.setItem('adminRole', response.data.role || 'Admin');
                toast.success(`Welcome to the dashboard`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-[#f8f7f5] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D8BF91] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6B4E2E] rounded-full mix-blend-multiply filter blur-[130px] opacity-20"></div>

            <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-md w-full mx-4 border border-white/40 z-10">
                <div className="flex flex-col items-center mb-8">
                    <img src={assets.logo} alt="WILDBEARS Admin" className="w-48 mb-6 drop-shadow-sm" />
                    <h1 className="text-2xl font-bold tracking-tight text-gray-800">Admin Control Panel</h1>
                    <p className="text-sm text-gray-500 mt-1">Authenticate to access enterprise tools</p>
                </div>

                <form onSubmit={onSubmitHandler} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase text-xs">Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B4E2E] focus:border-transparent outline-none transition-all"
                            type="email"
                            placeholder="admin@wildbears.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase text-xs">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B4E2E] focus:border-transparent outline-none transition-all"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        className="w-full py-4 mt-4 rounded-xl text-white bg-[#6B4E2E] hover:bg-[#5a422a] font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
                    </button>
                </form>
                
                <p className="text-center text-xs text-gray-400 mt-8 font-medium tracking-wide border-t border-gray-100 pt-6">
                    &copy; {new Date().getFullYear()} WILDBEARS INC. AUTHORIZED ACCESS ONLY.
                </p>
            </div>
        </div>
    );
};

export default Login;
