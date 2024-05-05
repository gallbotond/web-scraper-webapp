import { A } from "@solidjs/router";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <A href="/">Home</A>
        </li>
        <li>
          <A href="/users">Users</A>
        </li>
        <li>
          <A href="/items">Items</A>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
