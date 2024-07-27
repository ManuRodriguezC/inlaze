import BackCircle from "@/app/icons/BackCircle"
import Email from "@/app/icons/Email"
import View from "@/app/icons/View"
import useStore from "@/app/store/store"
import styles from "@/app/styles/login.module.css"
import Image from "next/image"
import { useState } from "react"

export default function Login() {

    const [controlRender, setControlRender] = useState(true)
    const [controlPassword, setPasswordControl] = useState(false)
    const { updateLoginPage } = useStore()

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
                        <button className={styles.register}>Register with your Email <Email /></button>
                        :
                        <div className={styles.inputs}>
                            <p>We love having you back</p>
                            <input className={styles.input} placeholder="Email" type="text" name="" id="" />
                            <div className={styles.password}>
                                <input placeholder="Password" type={controlPassword ? "text" : "password"} name="" id=""/>
                                <button onClick={() => setPasswordControl(!controlPassword)}>
                                    <View />
                                </button>
                            </div>
                        </div>
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