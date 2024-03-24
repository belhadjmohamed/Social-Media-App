import React from "react";
import {Route, Navigate} from "react-router-dom";


const PrivateRouter = ({path,element}) => {
    const login = localStorage.getItem('login');
    return  login ? <Route path={path} element={element} /> : <Navigate to='/' />
}

export default PrivateRouter;