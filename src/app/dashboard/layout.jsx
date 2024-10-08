import NavbarDashboard from "@/components/sections/NavbarDashboard"
// import Navbar from "@/components/sections/NavbarProjects"

export default function ProjectTemplate({ children }) {
    return (
        <>
            <NavbarDashboard />

            <main>
                {children}
            </main>
        </>
    )
  }