import { createSignal } from "solid-js";
import logo from "./assets/favicon.ico";
import Navbar from "./components/Navbar";

function App(props) {
  const [darkMode, setDarkMode] = createSignal(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode());
  }

  return (
    <div
      class="m-0 w-full p-4"
      classList={{
        "bg-neutral-900": darkMode(),
        "bg-slate-100": !darkMode(),
        "text-white": darkMode(),
      }}
    >
      <header class="my-0 flex">
        <img
          class="rounded-md outline-2 border-4 bg-slate-300"
          src={logo}
          alt="logo"
        />
        <h1 class="flex items-center m-auto">Data View</h1>
        <Navbar />
        <button
          class="p-2 bg-slate-300 text-slate-100 rounded-md"
          onClick={toggleDarkMode}
        >
          Dark mode
        </button>
      </header>
      {props.children}
    </div>
  );
}

export default App;
