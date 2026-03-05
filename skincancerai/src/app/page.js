"use client";

import Navbar from './components/navbar';
import Title from './components/title';
import Connect from './components/connect';
import Instruction from './components/instruction'; 
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Title />
        {/* Add other components like WhyUse, HowItWorks, AIChatbot here */}

        <Instruction/> 
      </main>
      <Connect />
    </>
  );
}