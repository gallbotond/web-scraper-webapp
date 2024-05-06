import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import { useSelectedContext } from "../context/SelectedContext";

const fetchItem = async (id) => {
    return fetch(`http://localhost:5555/items/${id}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log("fetch", data.img);
            return data;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

function Item() {
    const params = useParams();
    const [item] = createResource(() => fetchItem(params.id)); // fetch item example
    const { selectedItems, setSelectedItems } = useSelectedContext();
    const addItem = () => {
        // check if item exists
        // const exists = selectedItems.find((p) => {
        //     p.id === item()._id;
        //     console.log(
        //         "p.id",
        //         p.id,
        //         "item()._id",
        //         item()._id,
        //         p.id === item()._id
        //     );
        // });
        let exists = false;
        console.log(
            "selected items",
            selectedItems,
            "exists",
            exists,
            item()._id,
            selectedItems
        );
        for (const i of selectedItems) {
            if (i.id === item()._id) {
                exists = true;
                break;
            }
        }
        // console.log(exists)
        if (exists) {
            console.log("item exists");
            setSelectedItems((prevItems) =>
                prevItems.map((p) => {
                    p.id === item()._id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p;
                    console.log('quantity', p.quantity);
                })
            );
        } else {
            // add new item
            console.log("item does not exist");
            setSelectedItems((prevItems) => [
                ...prevItems,
                { ...item(), quantity: 1, id: item()._id },
            ]);
        }
    };
    return (
        <Show when={item()} fallback={<p>Loading...</p>}>
            Item {params.id}
            <div class="flex gap-2">
                <img src={item().img} alt="img" class="max-w-20" />
                <h1>Name</h1>
                <h2>{item().name}</h2>
                <button
                    class="btn text-white bg-green-500 rounded-lg p-3"
                    onClick={addItem}
                >
                    Add to cart
                </button>
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
