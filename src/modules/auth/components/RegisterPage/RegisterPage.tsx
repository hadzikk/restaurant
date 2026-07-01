import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useRegister } from "../../hooks/useAuth"
import Divider from "@shared/components/Divider/Divider"
import GoogleButton from "@shared/components/GoogleButton/GoogleButton"
import styles from "./RegisterPage.module.css"

const RegisterPage = () => {
  const { mutate: register, isPending, error } = useRegister()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    register(
      { email, full_name: fullName, phone, password }
    )
  }

  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Create account</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className={styles.input}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
          <label className={styles.label}>Phone</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className={styles.input}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <label className={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <p className={styles.error}>{error.message}</p>}
          <button type="submit" className={styles.action} disabled={isPending}>
            {isPending ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className={styles.hint}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <Divider />
        <GoogleButton />
      </div>
    </section>
  )
}

export default RegisterPage
