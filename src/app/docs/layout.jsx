import NavbarDocs from "@/components/sections/NavbarDocs";
import NavbarHome from "@/components/sections/NavbarHome";


export default function Layout({ children }) {
    return (
        <>
            <NavbarDocs />

            <main>
                {children}
            </main>
        </>
    )
  }