import Navbar from "@/components/sections/NavbarProjects"

export default function ProjectTemplate({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
  }