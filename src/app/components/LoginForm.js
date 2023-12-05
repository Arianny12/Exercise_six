import styles from 'src/app/components/components.module.css'
const LoginForm = ({loginUser}) => {
    return (
        <div>
            <h2>Login Form</h2>
            <form className={styles.Form} onSubmit={(e) => loginUser(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email"/>

                <label htmlFor="pass">Password</label>
                <input type="password" name="password"/>

                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginForm;