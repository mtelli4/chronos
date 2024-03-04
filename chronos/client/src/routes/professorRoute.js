import { Navigate, Outlet } from "react-router-dom"
import { authService } from "../services/authService"

export const ProfessorPrivateRoute = ({children}) => {
   
   return (authService.getCurrentRole().includes("ROLE_PROFESSOR")) ? <Outlet/> : <Navigate to="/unauthorized" />
   // return (authService.getCurrentRole() == "ROLE_PROFESSOR") ? <Outlet/> : <Navigate to="/unauthorized" />
}