import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-950 to-slate-950 text-slate-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
