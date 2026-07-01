import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useLogin } from "../../hooks/useAuth"
import Divider from "@shared/components/Divider/Divider"
import GoogleButton from "@shared/components/GoogleButton/GoogleButton"
import styles from "./LoginPage.module.css"

const LoginPage = () => {
  const { mutate: loginWithPassword, isPending, error } = useLogin()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    loginWithPassword(
      { email, password },
    )
  }

  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome back</h1>
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
          <label className={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <p className={styles.error}>{error.message}</p>}
          <button type="submit" className={styles.action} disabled={isPending}>
            {isPending ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className={styles.hint}>
          No account? <Link to="/register">Create one</Link>
        </p>
        <Divider />
        <GoogleButton />
      </div>
    </section>
  )
}

export default LoginPage
