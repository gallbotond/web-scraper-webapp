import { For, createResource } from "solid-js";
import Card from "../components/Card";
import { useSelectedContext } from "../context/SelectedContext";

// fetch example json
const fetchItems = async () => {
    return fetch("http://localhost:5555/items")
        .then((response) => response.json())
        .then((json) => {
            //   console.log("fetch", data.data);
            return json.data;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

export default function ItemsPage() {
    const [items] = createResource(fetchItems); // fetch items
    const { selectedItems } = useSelectedContext();
    console.log(selectedItems);
    return (
        <>
            <div>
                <h1 class="text-3xl">context Items</h1>
                <For each={selectedItems}>
                    {(item) => (
                        <p>
                            {item.name.slice(0, 20)} {item.quantity}
                        </p>
                    )}
                </For>
            </div>
            <Show when={items()} fallback={<p>Loading...</p>}>
                <For each={items()}>
                    {(item) => (
                        <>
                            <Card
                                name={item.name}
                                available={item.rating != -1}
                                id={item._id}
                                img={item.img}
                            />
                            {/* <button class="btn text-white bg-green-500 rounded-lg p-3">Select item</button> */}
                        </>
                    )}
                </For>
            </Show>
        </>
    );
}
