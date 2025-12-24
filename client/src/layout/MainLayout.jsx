import { Outlet } from "react-router"
import Navbar from "../components/shared/Navbar"

const MainLayout = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout