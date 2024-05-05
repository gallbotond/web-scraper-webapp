import { A } from "@solidjs/router";

export default function Card(props) {
  return (
    <div
      className="card"
      class=" p-2 rounded-md shadow-md my-4"
      classList={{
        "bg-gray-400 text-slate-200": props.available,
        "bg-green-100": !props.available,
      }}
    >
      <A href={`/item/${props.id}`} class="flex">
        <div class="mx-2 flex-none">
          {/* <img src={props.img} alt="img" class="max-w-20"/> */}
          {/* {console.log(props.img)} */}
        </div>
        <div className="flex-col">
          <h2>{props.name}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
            distinctio in nobis, iste laudantium placeat id maxime illo
            temporibus harum odio hic nesciunt, quos ea architecto corrupti
            molestias eius saepe!
          </p>
        </div>
      </A>
    </div>
  );
}
