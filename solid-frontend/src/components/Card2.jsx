export default function Card2(props) {
  return (
    <div
      className="card"
      class=" p-2 rounded-md shadow-md flex my-4"
      classList={{
        "bg-gray-400 text-slate-200": props.available,
        "bg-green-100": !props.available,
      }}
    >
      {props.children}
    </div>
  );
}
