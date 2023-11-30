import Link from "next/link";
import styles from 'src/app/components/components.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.HeaderNav}>
                <Link href="/">User Profile</Link>
                <Link href="/login">User Login</Link>
                <Link href="/create">Create User</Link>
            </nav>
        </header>
    )
}

export default Header;