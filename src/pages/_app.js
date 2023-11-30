import { useEffect, useState, useCallback } from "react";
import { initializeApp} from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "@/app/components/Header";
import firebaseConfig from "@/app/components/firebaseComponents";
 
export default function MyApp ({Component,pageProps}) {
    const [appInitialized, setAppInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState(null);

    const createUser = useCallback((e) =>{
        
    }, []);


    const loginUser = useCallback((e) =>{

    }, []);


    const logoutUser = useCallback(() =>{

    }, []);


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
            <Header />
            <Component
                {...pageProps}
                createUser = {createUser}
                isLoggedIn = {isLoggedIn}
                loginUser = {loginUser}
                userInformation= {userInformation}
            />
        </>
    )
}
