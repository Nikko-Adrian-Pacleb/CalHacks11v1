"use client";
import Link from "next/link";
export default function Home() {
  return (
    <main
      className="w-full mx-auto min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: "url('/images/bg.jpeg')", // Correctly referencing the image
        backgroundSize: "cover", // Ensure the image covers the entire area
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <h1 className="font-bold font-title  text-9xl text-cDarkBlue ">BrainHive</h1>
        <p className="font-para text-cDarkBlue">A more personalized touch to your notes</p>
      </div>
      <Link href="./productPage">
        <button className="mt-8 bg-nWhite hover:bg-hWhite text-black font-bold py-2 px-4 rounded">
          Try now
        </button>
      </Link>
    </main>
  );
}
