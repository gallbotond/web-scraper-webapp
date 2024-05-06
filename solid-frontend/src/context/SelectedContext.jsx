import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export const SelectedContext = createContext();

export const SelectedProvider = (props) => {
    const [selectedItems, setSelectedItems] = createStore([
        {
            name: "test1",
            available: true,
            _id: 1,
            quantity: 1,
        },
        {
            name: "test2",
            available: false,
            _id: 2,
            quantity: 1,
        },
    ]);
    return (
        <SelectedContext.Provider value={{ selectedItems, setSelectedItems }}>
            {/* ATTENTION this is the way to access properties when using context with store, probably because the specific nature of stores */}
            {props.children}
        </SelectedContext.Provider>
    );
};

export function useSelectedContext() {
    return useContext(SelectedContext);
}
