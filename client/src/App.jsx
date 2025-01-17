import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-950 to-slate-950 text-slate-50 pb-16 px-2 md:px-4 lg:px-8">
      <Header />
      <div className="container mx-auto max-w-[1200px] grow flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
