
"use client";

import Navbar from './components/navbar'
import Title from './components/title'
import Connect from './components/connect'
import WhyUs from './components/why_us'
import HowItWorksModel from './components/how_does_it_work'


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

        <Instruction/> 

        <WhyUs />
        <HowItWorksModel />
        {/* Other components like WhyUse, HowItWorks, AIChatbot, TryDiagnostics would go here */}
      </main>
      <Connect />
    </>
  );
}