import { Navigate, Outlet } from "react-router-dom"
import { authService } from "../services/authService"

export const DirectorPrivateRoute = ({children}) => {
   
   return ((authService.getCurrentRole().includes("ROLE_DIRECTOR"))||(authService.getCurrentRole().includes("ROLE_DEPARTMENT_DIRECTOR"))) ? <Outlet/> : <Navigate to="/unauthorized" />
   // return (authService.getCurrentRole() == "ROLE_DIRECTOR") ? <Outlet/> : <Navigate to="/unauthorized" />
}