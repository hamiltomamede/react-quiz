import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav className="w-full bg-transparent text-neutral-900 px-5 md:px-10 flex items-center justify-between py-5 text-sm border-b-slate-200 border">
      <h1 className="text-orange-500 text-2xl font-bold tracking-tight flex items-center gap-1">
        <a href="/">Jw<span className="text-neutral-900"> Quiz</span></a>
        {/* <div className="w-2 h-2 bg-red-500 mt-2 ml-1 rounded-full" /> */}
      </h1>
      <div className="space-x-5">
      </div>
    </nav>
  );
}

export default Navbar;
