import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doLogin } from '../store/features/authenSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin({
            ...formLogin,
            [name]: value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const { email, password } = formLogin;

        // Kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            toast.error("Email không được để trống");
            return false;
        } else if (!emailRegex.test(email)) {
            toast.error("Email không hợp lệ");
            return false;
        }

        // Kiểm tra password
        if (!password) {
            toast.error("Password không được để trống");
            return false;
        } else if (password.length < 6) {
            toast.error("Password phải có ít nhất 6 ký tự");
            return false;
        }

        return true;
    };

    const handleLogin = () => {
        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        dispatch(doLogin(formLogin));
        if (localStorage.getItem("userName")) {
            navigate("/");
            toast.success('Đăng nhập thành công');
        } else {
            toast.error('Đăng nhập thất bại');
        }
        console.log(formLogin);
    };

    return (
        <>
            <section className="">
                <div className="pt-20">
                    <h2 className="text-3xl font-semibold text-center">Account</h2>
                    <div className="container">
                        <div className="max-w-xl mx-auto">
                            <h2 className="font-semibold text-2xl">Sign in</h2>
                            <div className="mt-5">
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                        placeholder="Email*"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mt-3 relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        className="mt-2 w-full h-[50px] border border-gray px-4 pr-12 rounded-lg text-[14px]"
                                        placeholder="Password*"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </button>
                                </div>

                                <a href="#none" className="text-xs mt-5 mb-5 block hover:underline">
                                    Forgot password ?
                                </a>
                                <button
                                    onClick={handleLogin}
                                    className="w-full uppercase h-[50px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-lg hover:bg-white border hover:border-black hover:text-black transition-all"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-12 pb-12" />
        </>
    );
}

export default Login;
