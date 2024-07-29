import { addUser, loginUser } from "@/app/api/controlsUser"
import BackCircle from "@/app/icons/BackCircle"
import View from "@/app/icons/View"
import useStore from "@/app/store/store"
import styles from "@/app/styles/login.module.css"
import Image from "next/image"
import React, { useState } from "react"

export default function Login() {

    const { updateLoginPage, updateUsername, loginSesion } = useStore()
    const [controlSizePassword, setControlSizePassword] = useState(false)
    const [controlSizeUsername, setControlSizeUsername] = useState(false)
    const [controlPassword, setPasswordControl] = useState(false)
    const [controlRender, setControlRender] = useState(true)
    const [controlError, setControlError] = useState(false)
    const [textError, setTextError] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameLogin, setUsernameLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [controlLogin, setControlLogin] = useState(false)
    const [textControlLogin, setTextControlLogin] = useState('')

    const handleSingupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const fields = Object.fromEntries(formData.entries());
        const { username, password, email} = fields
        if (password.toString().length < 8) {
            setControlSizePassword(true)
            return
        } else {
            setControlSizePassword(false)
        }
        if (username.toString().length < 6) {
            setControlSizeUsername(true)
            return
        } else {
            setControlSizeUsername(false)
        }
        const userData = {
            username: username.toString(),
            password: password.toString(),
            email: email.toString()
        }
        const result = await addUser(userData)
        if (result.status === 201) {
            console.log(result.response)
            setControlError(false)
            setTextError("")
            updateUsername(result.response.username)
            updateLoginPage()
        } else if (result.status === 400) {
            setControlError(true)
            const errorText = result.response.message
            if (errorText == "An account already exists with this Username") {
                setUsername("")
            }
            if (errorText == "An account already exists with this Email") {
                setEmail("")
            }
            setTextError(result.response.message)
        }
      };
      
      const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const fields = Object.fromEntries(formData.entries());
        const { username, password } = fields
        const userData = {
            username: username.toString(),
            password: password.toString(),
        }
        const result = await loginUser(userData)
        if (result.status === 400) {
            setTextControlLogin(result.response.message)
            setControlLogin(true)
            setPasswordLogin('')
            setUsernameLogin('')
        } else if (result.status === 201) {
            setTextControlLogin('')
            setPasswordLogin('')
            setUsernameLogin('')
            setControlLogin(false)
            updateLoginPage()
            const { username, favorites, saved }= result.response
            loginSesion(username, favorites, saved)
        }

      };

    return (
        <div className={styles.login}>
            <div className={styles.left}>
                <button onClick={updateLoginPage} className={styles.back}>
                    <BackCircle />
                    Back
                </button>
                <div className={styles.leftInfo}>
                    <div className={styles.buttons}>
                        <button
                        className={controlRender ? styles.active : styles.desactivate}
                            onClick={() => setControlRender(true)}>
                        Sing up</button>
                        <button
                            className={controlRender ? styles.desactivate : styles.active}
                            onClick={() => setControlRender(false)}>
                        Log in</button>
                    </div>
                    {
                        controlRender
                        ?
                        <form className={styles.inputs} onSubmit={handleSingupSubmit}>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.input}
                                placeholder="Username"
                                type="text"
                                name="username"
                                id="username"
                                required />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                placeholder="Email"
                                type="email"
                                name="email"
                                id="email"
                                required />
                            <div className={styles.password}>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    type={controlPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    required/>
                                <button type="button" onClick={() => setPasswordControl(!controlPassword)}>
                                    <View />
                                </button>
                            </div>
                            {controlSizePassword&&<span className={styles.errorSize}>The password must be greater that 8 caracthers.</span>}
                            {controlSizeUsername&&<span className={styles.errorSize}>The username must be greater that 6 caracthers.</span>}
                            {controlError&&<span className={styles.errorSize}>{textError}</span>}
                            <button type="submit" className={styles.register}>Sing Up</button>
                        </form>
                        :
                        <form className={styles.inputs} onSubmit={handleLoginSubmit}>
                            <p>We love having you back</p>
                            <input
                                value={usernameLogin}
                                onChange={(e) => setUsernameLogin(e.target.value)}
                                className={styles.input}
                                placeholder="Email"
                                type="text"
                                name="username"
                                id="username" />
                            <div className={styles.password}>
                                <input
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                    placeholder="Password"
                                    type={controlPassword ? "text" : "password"}
                                    name="password"
                                    id="password"/>
                                <button type="button" onClick={() => setPasswordControl(!controlPassword)}>
                                    <View />
                                </button>
                            </div>
                            {controlLogin&&<span className={styles.errorSize}>{textControlLogin}</span>}
                            <button type="submit" className={styles.register}>Login</button>
                        </form>
                    }
                    <p className={styles.question}>For any questions, reach out to supportinlazedmovies.com</p>
                </div>
            </div>
            <div className={styles.rigth}>
                {controlRender ? <h4>Welcome to Inlaze Movies!</h4> : <h4>Welcome back to Inlaze Movies!</h4>}
                {
                    controlRender
                    ?
                    <p>🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!</p>
                    :
                    <p>🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!</p>
                }
                {controlRender ?
                <Image width={547} height={546} src={'/images/sing.png'} alt="loginimage"/>
                :
                <Image width={547} height={546} src={'/images/login.png'} alt="loginimage"/>
                }
            </div>
        </div>
    )
}