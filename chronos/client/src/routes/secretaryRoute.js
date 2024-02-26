import { Navigate, Outlet } from "react-router-dom"
import { authService } from "../services/authService"

export const SecretaryPrivateRoute = ({children}) => {
   
   return (authService.getCurrentRole().includes("ROLE_SECRETARY")) ? <Outlet/> : <Navigate to="/unauthorized" />
   // return (authService.getCurrentRole() == "ROLE_SECRETARY") ? <Outlet/> : <Navigate to="/unauthorized" />
}