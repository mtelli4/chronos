import { Navigate, Outlet } from "react-router-dom"
import { authService } from "../services/authService"

export const AdminPrivateRoute = ({children}) => {
   
   return (authService.getCurrentRole().includes("ROLE_ADMIN")) ? <Outlet/> : <Navigate to="/unauthorized" />
   // return (authService.getCurrentRole() == "ROLE_ADMIN") ? <Outlet/> : <Navigate to="/unauthorized" />
}