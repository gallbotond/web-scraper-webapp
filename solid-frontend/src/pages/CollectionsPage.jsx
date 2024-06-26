import { Show, createResource } from "solid-js";
import Card from "../components/Card";

const fetchItems = async () => {
    return fetch("http://localhost:5555/items")
        .then((response) => response.json())
        .then((json) => {
            // console.log("fetch", json.data);
            return json.data;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

function CollectionsPage({ limit }) {
    const [items] = createResource(fetchItems);
    return (
        <Show when={items()} fallback={<p>Loading...</p>}>
            <For each={items().slice(0, 10)}>
                {(item) => (
                    <>
                        <Card
                            name={item.name}
                            has_rating={item.rating != -1}
                            rating={item.rating}
                            num_reviews={item.num_reviews}
                            id={item._id}
                            img={item.img}
                            price={item.price}
                        />
                    </>
                )}
            </For>
        </Show>
    );
}
export default CollectionsPage;
