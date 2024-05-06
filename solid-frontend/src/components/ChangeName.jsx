import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

function ChangeName() {
    const [name, setName] = createSignal("Mario");
    const [truth, setTruth] = createSignal(true);
    const [count, setCount] = createSignal(0);
    const [person, setPerson] = createSignal({
        name: { first: "Mario", last: "Lambourghini" },
        age: 30,
    });

    // object store example
    const [data, setData] = createStore({
        name: { first: "Mario", last: "Lambourghini" },
        age: 30,
    });

    function ChangeName() {
        setData("name", "first", "Luigi");
    }

    // array store example
    const [products, setProducts] = createStore([
        {
            name: "Laptop Gaming ASUS ROG Zephyrus G14 GA401IHR-HZ015 cu procesor AMD Ryzen 7 4800HS",
            available: true,
            id: 1,
        },
        {
            name: "Laptop Gaming ASUS ROG Zephyrus Duo 16 GX650PZ cu procesor AMD Ryzen 9 7945HX pana la 5.40 GHz",
            available: false,
            id: 2,
        },
    ]);

    // how to update a property of an object in a store
    function changeProductAvailability(id) {
        setProducts(
            products.map((p) =>
                p.id === id ? { ...p, available: !p.available } : p
            )
        );
    }

    // timed functions
    setTimeout(() => {
        setName("anon");
    }, 1000);

    setTimeout(() => {
        // setTruth(false);
        // setTruth(!truth());
        setTruth((prev) => !prev);
    }, 2000);

    setTimeout(() => {
        // to update a property of an object, we need to create a whole new object
        setPerson({
            name: { first: "Luigi", last: "Lambourghini" },
            age: 35,
        });
    }, 3000);

    // effect example: we can track the changes of a signal
    createEffect(() => {
        console.log("name changed to", name());
    });

    // effect example: we can track the changes of a store
    // we have to be specific about the properties
    createEffect(() => {
        console.log(products[0].available);
    });

    const count_interval = setInterval(() => {
        setCount((prev) => prev + 1);
    }, 1000);

    createEffect(() => {
        console.log("count changed to", count());
        if (count() == 5) {
            clearInterval(count_interval);
        }
    });

    // derived value example
    const doubleCount = () => count() * 2;

    // const totalPrice = () => {
    //     return products.reduce((acc, p) => {
    //         return p.available ? acc + 1 : acc;
    //     }, 0);

    return (
        <div>
            <p>
                The name is {name}: {truth() ? "yes" : "no"} {count()}{" "}
                {doubleCount()}
            </p>
            <p>
                {/* {person().name.first} {person().name.last} is {person().age}{" "} years old */}
                {data.name.first} {data.name.last} is {data.age} years old
            </p>
            <button onClick={ChangeName}>Change name: </button>
            <input
                class="px-2 mx-2"
                type="text"
                onInput={(e) => setName(e.target.value)}
            />
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li>
                        {product.name} is{" "}
                        {product.available ? "available" : "not available"}
                    </li>
                ))}
            </ul>
            <button onClick={() => changeProductAvailability(1)}>
                Change availability
            </button>
        </div>
    );
}
export default ChangeName;
