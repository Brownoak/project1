import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import avatar from "../../assets/profile.png";
import banner from "../../assets/banner.png";
import Button from "../../components/button/Button";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const LoginPage = () => {
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [err, setErr] = useState(false);
    const [usrErr, setUserErr] = useState(false)
    const container = () => {
        return document.getElementsByClassName('lo')
    }
    const handleLogin = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, password,
            }),

        }).then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setRedirect(true)
                } else if (data.status === "err") {
                    setErr(true)
                } else if (data.status === "user_error") {
                    setUserErr(true)
                }
            })

        if (
            email.length == 0 ||
            password.length <= 5 ||
            !email.includes('@') || !email.includes('.')
        ) {
            setError(true);
        }


    }


    return (
        <div className="vh-100 d-flex flex-row align-items-center">
            <div className="wrapper_left d-none d-md-flex col-12 col-md-6 h-100 justify-content-center align-items-center rounded-end">
                <div >
                    <img src={banner} className="w-" />
                </div>
            </div>
            <div className="wrapper_right col-md-6 col-12 d-flex flex-column justify-content-center align-items-center ">
                <img src={avatar} className="img" />
                <h4 className='text-center'>WelCome! Log in to Your Account</h4>
                <p className='text-center text-secondary pb-4'>add your credentials</p>
                <form onSubmit={handleLogin} >
                    <div className="form-group mb-2 ">
                        <span className="d-flex align-items-end">
                            <EmailIcon className="mr-3 icons" />
                            <input
                                placeholder="Email"
                                type='email'
                                className='form-control'
                                onChange={(e) => setEmail(e.target.value)} required></input>
                        </span>
                        {error && (email.length == 0 || !email.includes('@') || !email.includes('.')) ? (
                            <div className="text-danger ">please enter a valid email</div>
                        ) : (
                            ""
                        )}
                        {err ? <p className="text-danger">Invalid Email or Password</p> : null}
                        {usrErr ? <p className="text-danger">User with this email does not exist</p> : null}
                    </div>


                    <div className="form-group mb-2">
                        <span className="d-flex align-items-end">
                            <LockIcon className="mr-3 align-items-end" />
                            <input
                                placeholder="Password"
                                type='password'
                                className='form-control'
                                onChange={(e) => setPassword(e.target.value)} minLength={6} required></input>

                        </span>
                        {err ? <p className="text-danger">Invalid Email or Password</p> : null}

                    </div>
                    < div className="d-flex assure pl-4">
                        <div class="form-check col-6 mr-3">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Remember me</label>
                        </div>
                        <p className="forgetPwd col-6 justify-content-end align-items-center">Forgot password?</p>

                    </div>

                    <Button title="Login" />

                    <div className=" d-flex justify-content-center">
                        <p >Don't have an account? <span className='font-semibold underline underline-offset-2 cursor-pointer'><Link to="/register">Sign Up</Link> </span></p>
                    </div>

                    <div className="d-flex">
                        <hr className="w-25" />
                        <p className="hr text-secondary">or sign in using</p>
                        <hr className="w-25" />
                    </div>
                </form>

                <div className="d-flex">
                    <div className="col-4"><GoogleIcon className="text-danger " /></div>
                    <div className="col-4"><FacebookIcon className="text-primary" /></div>
                    <div className="col-4"><InstagramIcon className="text-primary" /></div>
                </div>

                <p className="align-items-end terms pt-4" >By clicking the button above, you agree to our <span className="text-primary" style={{ cursor: "pointer" }}>terms of use </span>and <span className="text-primary" style={{ cursor: "pointer" }}>privacy policies</span></p>

                {redirect ? <Navigate to='/homee' /> : ""}


            </div>

        </div>
    )
}
export default LoginPage