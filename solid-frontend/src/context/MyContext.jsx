import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

export const MyContext = createContext("init");

export const MyProvider = (props) => {
    const [val, setVal] = createStore([
        {
            name: "test1",
            available: true,
            id: 1,
        },
        {
            name: "test2",
            available: false,
            id: 2,
        },
    ]);
    return (
        <MyContext.Provider value={{ val, setVal }}>
            {props.children}
        </MyContext.Provider>
    );
};
