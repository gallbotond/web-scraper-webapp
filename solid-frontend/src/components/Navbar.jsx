import { A } from "@solidjs/router";

function Navbar() {
    return (
        <nav>
            <ul class="flex gap-8 h-16 bg-slate-500 text-white items-center p-3">
                <li>
                    <A href="/">Home</A>
                </li>
                <li>
                    <A href="/search-terms">Search Terms</A>
                </li>
                <li>
                    <A href="/collections">Collections</A>
                </li>
                <li>
                    <A href="/search">Advanced Search</A>
                </li>
                <li>
                    <A href="/jobs">Scheduled Jobs</A>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;
