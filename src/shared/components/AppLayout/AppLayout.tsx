import Navbar from "@shared/components/Navbar/Navbar"
import Cart from "@shared/components/Cart/Cart"
import styles from "./AppLayout.module.css"

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={styles.root}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Cart />
    </div>
  )
}

export default AppLayout
