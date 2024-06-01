import { useRoutes } from "react-router-dom";
import RouteCaisse from "./Mainroute";
import LoginRoot from "./LoginRoot";
import DashboardRoot from './DashboardRoot';
export default function Route(){
    let router=[]
    router.push(RouteCaisse)
    router.push(LoginRoot)
    router.push(DashboardRoot)
    return useRoutes(router)
}