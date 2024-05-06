import { A } from "@solidjs/router";

export default function Card({
    name,
    has_rating,
    rating,
    num_reviews,
    img,
    price,
    id,
}) {
    console.log(price[price.length - 1].value.toFixed(2));
    return (
        <div
            className="card"
            class="flex gap-4 p-2 m-2 rounded-md shadow-md my-4"
            classList={{
                "bg-gray-400 text-slate-200": !has_rating,
                "bg-green-100": has_rating,
            }}
        >
            <img src={img} alt="img" class="max-w-20" />
            <div class="flex-column">
                <A href={`/items/${id}`} class="flex">
                    <h2>{name.split(" ").slice(0, 13).join(" ")}</h2>
                </A>
                <p class="font-bold">
                    {price[price.length - 1].value.toFixed(2)}
                </p>
                <p>
                    {has_rating
                        ? rating + " out of " + num_reviews + " reviews"
                        : "unrated"}
                </p>
            </div>
        </div>
    );
}
