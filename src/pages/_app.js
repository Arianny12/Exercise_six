import { useEffect, useState, useCallback } from "react";
import { initializeApp} from "firebase/app";
import Header from "@/app/components/Header";

import firebaseConfig from "@/app/components/firebaseComponents";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
 
export default function MyApp ({Component,pageProps}) {
    const [appInitialized, setAppInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState(null);
    const [error,setError] = useState(null);

    const createUser = useCallback((e) =>{
        e.preventDefault();
        //assign email and password
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const auth = getAuth();
        createUserWithEmailAndPassword (auth, email, password).then((userCredential)=>{
            const user = userCredential.user;
            setIsLoggedIn(true);
            setUserInformtion(user);
            setError(null);
        })
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({error, errorCode,errorMessage});
            setError(errorMessage);

        })
    }, [setError, setIsLoggedIn,setUserInformation]);


    const loginUser = useCallback((e) => {
        e.preventDefault();
        //assign email and password
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const auth = getAuth();
        signInWithEmailAndPassword (auth, email, password).then((userCredential)=>{
            const user = userCredential.user;
            setIsLoggedIn(true);
            setUserInformation(user);
            setError(null);
        })
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({error, errorCode,errorMessage});
            setError(errorMessage);
        })
    }, [setError, setIsLoggedIn,setUserInformation, signOut]);


    const logoutUser = useCallback(() =>{
        const auth = getAuth();
        signOut(auth)
            .then(()=>{
                setUserInformation(null);
                setIsLoggedIn(false);
        })
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({error, errorCode,errorMessage});
            setError(errorMessage);

        })

    }, [signOut, setIsLoggedIn, setUserInformation, setError]);


    useEffect(() => {
        initializeApp(firebaseConfig);
        setAppInitialized(true);
    }, []);

    useEffect(()=>{
        if (appInitialized) {
            const auth = getAuth();
            
            onAuthStateChanged (auth, (user) => {
                if(user){
                    setUserInformation(user);
                    setIsLoggedIn(true);
                } else{
                    setUserInformation(null);
                    setIsLoggedIn(false);
                }
                setIsLoading(false);
            });
        }

    }, [appInitialized]);

    if (isLoading) return null;

    return (
        <>
            <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser}/>
            <Component
                {...pageProps}
                createUser={createUser}
                isLoggedIn={isLoggedIn}
                loginUser={loginUser}
                userInformation={userInformation}
            />
            <p>{error}</p>
        </>
    );
}
