import { Navigate, Outlet } from "react-router-dom"
import { authService } from "../services/authService"

export const StudentPrivateRoute = ({children}) => {
   
   return (authService.getCurrentRole().includes("ROLE_USER")) ? <Outlet/> : <Navigate to="/unauthorized" />
   // return (authService.getCurrentRole() == "ROLE_USER") ? <Outlet/> : <Navigate to="/unauthorized" />
}