import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const checkAuth = (Component) => {
    function Wrapper(props) {
        const [isAuthChecked, setIsAuthChecked] = useState(false);
        const user = useSelector(store => store.auth.user);

        useEffect(() => {
            // Check if the user is authenticated
            if (!user) {
                // Delay the redirection until the authentication check is completed
                return;
            }

            setIsAuthChecked(true);
        }, [user]);

        // If the authentication check is not completed, render a loading indicator
        if (!isAuthChecked) {
            return <div>Loading...</div>;
        }

        // If the user is authenticated, render the wrapped component
        return <Component {...props} />;
    }

    return Wrapper;
};

export default checkAuth;
