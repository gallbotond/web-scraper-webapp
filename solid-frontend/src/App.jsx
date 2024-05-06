import Navbar from "./components/Navbar";

function App(props) {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    );
}

export default App;
