import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";

const fetchItem = async (id) => {
    return fetch(`http://localhost:5555/items/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("fetch", data.img);
            return data;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

function Item() {
    const params = useParams();
    const [item] = createResource(() => fetchItem(params.id));
    return (
        <Show when={item()} fallback={<p>Loading...</p>}>
            Item {params.id}
            <div class="flex gap-2">
                <img src={item().img} alt="img" class="max-w-20" />
                <h1>Name</h1>
                <h2>{item().name}</h2>
            </div>
            <h2>Specs</h2>
            <div>
                {item().specs.reduce((acc, spec_table) => {
                    for (let key in spec_table) {
                        acc.push(
                            <div class="flex gap-2 justify-between">
                                <h3>{key}</h3>
                                <p>{spec_table[key]}</p>
                            </div>
                        );
                    }
                    return acc;
                }, [])}
            </div>
        </Show>
    );
}
export default Item;
