import { For, Show, createResource } from "solid-js";
import Card from "../components/Card";

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

function Items() {
    const [items] = createResource(fetchItems);
    return (
        <Show when={items()} fallback={<p>Loading...</p>}>
            {console.log(items())}
            <For each={items()}>
                {(item) => (
                    <Card
                        name={item.name}
                        available={item.rating != -1}
                        id={item._id}
                        img={item.img}
                    />
                )}
            </For>
        </Show>
    );
}
export default Items;
