import { Link } from "react-router-dom"
const HomePage=()=>{
    return(
        <div className="pt-14">
            <p className="flex justify-center align-center text-2xl">Successful Registration</p>
            <p className="flex justify-center align-center text-xl">Welcome </p>
            <p><Link to="/">Log in</Link></p>
          
        </div>
    )
}

export default HomePage