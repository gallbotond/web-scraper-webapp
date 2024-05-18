import { createSignal } from "solid-js";
import Navbar from "./components/Navbar";

function App(props) {
    const [showText, setShowText] = createSignal(false);

    const toggleShowText = () => {
        setShowText(!showText());
        console.log(showText());
    };
    return (
        <div className="">
            <Navbar showText={showText} toggleShowText={toggleShowText} />
            <div
                className={`p-4 ${showText() ? "ml-48" : "ml-16"} 
                transition-all duration-500`}
            >
                {props.children}
            </div>
        </div>
    );
}

export default App;
