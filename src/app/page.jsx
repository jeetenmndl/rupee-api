import NavbarHome from "@/components/sections/NavbarHome";
import { Button } from "@/components/ui/button";
import Dots from "@/../public/dots.svg"
import Image from "next/image";
import AnimatedSphere from "@/components/sections/AnimatedSphere";
import HomeToast from "@/components/parts/HomeToast";




export default function Home() {
  return (
    <main>
     <NavbarHome />

{/* heading section  */}
     <section className="px-60 flex flex-col justify-center">

      <div className=" absolute top-50 left-20 w-52 h-52 bg-pink-50 blur-3xl"></div>
      <div className=" absolute bottom-20 right-36 w-80 h-80 bg-blue-50 blur-3xl"></div>

      <div className="flex items-center justify-center gap-4 mb-32 mt-4 ">
        <div className="font-semibold text-xl">
          Hey Developers!!
        </div>
        <p className="text-gray-600">No transaction fees on <span className="text-green-500 font-medium">esewa</span> for first 100 users.</p>
        <Button className="rounded-full text-sm">View Offers</Button>
      </div>

<div className="absolute top-20 left-0 flex justify-center ">
      <Image src={Dots} alt="rupee api dots background" className="z-0 w-3/4 hidden" />
</div>

      <h1 className="text-5xl font-semibold text-center z-10 ">One stop solution for secure and <br /> seamless payments</h1>
      
      <p className="py-12 text-xl text-center text-gray-600 z-10 ">
      Integrate our payment platform and offer your customers <br /> a safe and reliable way to make transactions.
      </p>

      <div className="flex gap-6 justify-center z-10 ">
        <Button className=" rounded-full p-6 w-48 bg-main">
          Integrate API
        </Button>

        <Button variant="outline" className="rounded-full p-6 w-48 border-gray-400">
          View Demo
        </Button>
      </div>

     </section>

     <HomeToast />

    <AnimatedSphere />


    <section>
      <div>
        <p>Remove the burden of integrating different payment gateway yourself.</p>
        <p>No need for set up cost for each vendors.</p>
        <p>Manage everything through a single dashboard and get regular insights.</p>
      </div>
    </section>


    </main>
  );
}
