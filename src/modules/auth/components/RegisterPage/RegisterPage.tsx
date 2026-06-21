import Divider from "@shared/components/Divider/Divider"
import GoogleButton from "@shared/components/GoogleButton/GoogleButton"
import styles from "./RegisterPage.module.css"

const RegisterPage = () => {
    return <section className={styles.root}>
        <div className={styles.content}>
            <h1 className={styles.title}>Let's get started</h1>
            <form action="" method="post" className={styles.form}>
                <label htmlFor="" className={styles.label}>Email</label>
                <input type="text" placeholder="Enter your email" className={styles.input} />
                <label htmlFor="" className={styles.label}>Full Name</label>
                <input type="text" placeholder="Enter your full name" className={styles.input} />
                <label htmlFor="" className={styles.label}>Phone</label>
                <input type="text" placeholder="Enter your phone number" className={styles.input} />
                <label htmlFor="" className={styles.label}>Password</label>
                <input type="password" placeholder="Create a password" className={styles.input} />
                <button className={styles.action}>Create account</button>
            </form>
            <Divider />
            <GoogleButton />
            <Divider />
        </div>
    </section>
}

export default RegisterPage