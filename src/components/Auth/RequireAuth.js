// // auth/RequireAuth.js

// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// const RequireAuth = (WrappedComponent) => {
//   const WithAuth = (props) => {
//     const user = useSelector((state) => state.auth.user);
//     const history = useHistory();

//     useEffect(() => {
//       if (!user) {
//         history.push('/login');
//       }
//     }, [user, history]);

//     return user ? <WrappedComponent {...props} /> : null;
//   };

//   return WithAuth;
// };

// export default RequireAuth;
