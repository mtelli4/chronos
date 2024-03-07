import { Navigate, Outlet } from "react-router-dom"
import { authService } from "../services/authService"

export const PrivateRoute = ({children}) => {
    
   return authService.isLoggedIn() ? <Outlet /> : <Navigate to="/login" />
}