import { Navigate, Outlet } from "react-router-dom"
import { authService } from "../services/authService"

export const SuperadminPrivateRoute = ({children}) => {
   
   return (authService.getCurrentRole().includes("ROLE_SUPERADMIN")) ? <Outlet/> : <Navigate to="/unauthorized" />
   // return (authService.getCurrentRole() == "ROLE_SUPERADMIN") ? <Outlet/> : <Navigate to="/unauthorized" />
}