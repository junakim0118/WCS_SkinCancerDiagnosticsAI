import Navbar from './components/navbar'
import Title from './components/title'
import Connect from './components/connect'
//make sure to import your components(blurbs) here

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Title />
        {/* Other components like WhyUse, HowItWorks, AIChatbot, TryDiagnostics would go here */}
      </main>
      <Connect />
    </>
  )
};
