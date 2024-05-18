import { A } from "@solidjs/router";

const parseName = (name) => {
    let displayName = name.split(" ").slice(0, 13).join(" ");
    if (displayName[displayName.length - 1] === ",") {
        displayName = displayName.slice(0, -1);
    }
    return displayName;
};

export default function Card({
    name,
    has_rating,
    rating,
    num_reviews,
    img,
    price,
    id,
}) {
    // console.log(price[price.length - 1].value.toFixed(2));
    console.log("")

    return (
        <div
            className="card"
            class="flex p-2 rounded-md shadow-md gap-2 mb-4 last:mb-0"
            classList={{
                "bg-gray-600 text-slate-200": !has_rating,
                "bg-green-600": has_rating,
            }}
        >
            <img src={img} alt="img" class="w-auto h-full max-w-16" />
            <div class="flex-column">
                <A href={`/items/${id}`} class="flex">
                    <h2>{parseName(name)}</h2>
                </A>
                <div className="flex justify-between">
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
        </div>
    );
}
