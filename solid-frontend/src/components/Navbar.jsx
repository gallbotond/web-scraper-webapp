import { A } from "@solidjs/router";

const NavIcon = ({ icon, text, href, showText }) => {
    return (
        <li class="mb-2 last:mb-0 p-2 px-3 rounded-lg bg-gray-800">
            <A href={href}>
                <div class="flex gap-2">
                    {icon}
                    {/* {showText() && <p>{text}</p>} */}
                    {/* <p
                        className={`${
                            showText() ? "block" : "hidden"
                        }transition duration-500`}
                    > */}
                    {/* <p classList={{ hidden: !showText() }}>{text}</p> */}
                </div>
            </A>
        </li>
    );
};

const MenuIcon = ({ toggleShowText, showText }) => {
    // createEffect(() => {
    //     showText();
    // });
    return (
        <div
            className="flex"
            classList={{
                "justify-center": !showText(),
                "justify-end": showText(),
            }}
        >
            <button className="mb-1" onclick={() => toggleShowText()}>
                {/* {showText() ? (
                    <i className="ri-close-line text-2xl"></i>
                ) : (
                    <i class="ri-menu-line text-2xl"></i>
                )} */}
                <i
                    className={`text-2xl ${
                        showText() ? "ri-close-line" : "ri-menu-line"
                    }`}
                ></i>
            </button>
        </div>
    );
};
function Navbar({ showText, toggleShowText }) {
    return (
        <nav
            class="fixed h-screen bg-slate-900 p-2"
            classList={{ "w-16": !showText() }}
        >
            <MenuIcon toggleShowText={toggleShowText} showText={showText} />
            <ul class="flex-column">
                <NavIcon
                    icon={<i class="ri-home-line"></i>}
                    text={"Home"}
                    href="/"
                    showText={showText}
                />
                <NavIcon
                    icon={<i class="ri-menu-search-line"></i>}
                    text={"Search Terms"}
                    href="/search-terms"
                    showText={showText}
                />
                <NavIcon
                    icon={<i class="ri-list-check"></i>}
                    text={"Collections"}
                    href="/collections"
                    showText={showText}
                />
                <NavIcon
                    icon={<i class="ri-search-line"></i>}
                    text={"Advaned Search"}
                    href="/search"
                    showText={showText}
                />
                <NavIcon
                    icon={<i class="ri-task-line"></i>}
                    text={"Scheduled Jobs"}
                    href="/jobs"
                    showText={showText}
                />
            </ul>
        </nav>
    );
}
export default Navbar;
