import Divider from "@shared/components/Divider/Divider"
import GoogleButton from "@shared/components/GoogleButton/GoogleButton"
import styles from "./LoginPage.module.css"

const LoginPage = () => {
    return <section className={styles.root}>
        <div className={styles.content}>
            <h1 className={styles.title}>Welcome back</h1>
            {/* <p className={styles.hint}>Sign in to your registered account.</p> */}
            <form action="" method="post" className={styles.form}>
                <label htmlFor="" className={styles.label}>Email</label>
                <input type="text" placeholder="Enter your email" className={styles.input} />
                <label htmlFor="" className={styles.label}>Password</label>
                <input type="password" placeholder="Create a password" className={styles.input} />
                <button className={styles.action}>Login</button>
            </form>
            <Divider />
            <GoogleButton />
            <Divider />
        </div>
    </section>
}

export default LoginPage