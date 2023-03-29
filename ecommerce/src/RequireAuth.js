import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";

import React, { useState } from 'react'

const RequireAuth = () => {
    const [{user}, _ ] = useStateValue();
    const location = useLocation();

  return (
    <div>
        {user ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />}
    </div>
  )
}

export default RequireAuth