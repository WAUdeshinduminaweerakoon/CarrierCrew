const App = () =>{
    return (
        <div className="login-container">
            <h2 className="form-title">Welcome Back, Glad to See You Again!</h2>

            <form action="#" className="login-form">
                <div className="input-wrapper">
                    <label className="login-form-label">Username</label>
                    <input type="text" placeholder="Enter your username" className="input-field" required/>
                    <br></br><br></br>

                    <label className="login-form-label">Password</label>
                    <input type="password" placeholder="Enter your password" className="input-field" required/>
                    <br></br><br></br>

                    <input type="checkbox" value="Remeber Me?"/>
                    <label className="login-form-label">Remember Me?</label>

                    <a href="#" className="forget-password-link">Forgot Password?</a>
                    <br></br><br></br>

                    <button value="Login" className="login-button">Login</button>
                    <br></br><br></br>

                    <button value="0" className="login-with-social-link">Continue with Google</button>
                    <br></br><br></br>

                    <p>Don't have an Account?</p>
                    <a href="#">Click here to Register</a>
                </div>
            </form>
        </div>
    )
}

export default App;