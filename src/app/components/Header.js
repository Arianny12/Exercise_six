import Link from "next/link";
import styles from 'src/app/components/components.module.css'

const Header = ({isLoggedIn, logoutUser}) => {
    console.log({isLoggedIn})
    return (
        <header className={styles.header}>
            <nav className={styles.HeaderNav}>
                {isLoggedIn && (
                    <>
                        <Link href="/">User Profile</Link>
                        <a onClick={logoutUser}>Log Out</a>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <Link href="/login">User Login</Link>
                        <Link href="/create">Create User</Link>
                    </>
                )}
        
            </nav>
        </header>
    );
}

export default Header;