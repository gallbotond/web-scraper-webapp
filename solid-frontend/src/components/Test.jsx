import { Router } from "@solidjs/router";
import { useContext } from "solid-js";
import { MyContext, MyProvider } from "../context/MyContext";

const Parent = ({ children }) => {
    return (
        <>
            <h1>Parent</h1>
            {children}
        </>
    );
};

const Child = () => {
    const { val, setVal } = useContext(MyContext);
    console.log(val[0].name);
    return (
        <>
            <h1>Child</h1>
            <p>{val[0].name}</p>
        </>
    );
};

function Test() {
    return (
        <>
            {/* <Router> */}
                <MyProvider>
                    <Parent>
                        <Child /> {/* "new value" */}
                    </Parent>
                </MyProvider>
            {/* </Router> */}
            <h1>Hello</h1>
        </>
    );
}
export default Test;
