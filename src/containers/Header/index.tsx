import Link from "next/link"
import Logo from "@/components/Logo"
import { Sidebar, Search, Userbar } from "./partials/bars"
import { useStore, Controller } from "./store"
import { APP_NAME } from "@/data/constants"

export default function Header() {
    const store = useStore()

    return (
        <div className="experiencefragment HFexperiencefragment">
            <div className="cmp-experiencefragment cmp-experiencefragment--header">
                <div className="xf-content-height">
                    <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                        <div className="headerv2 aem-GridColumn aem-GridColumn--default--12">
                            {/* HEADER START */}
                            <header className="fxg-header fxg-header--sticky">
                                {/* GLOBAL NAV START */}
                                <nav className={`fxg-nav ${store.sidebarOpen ? "fxg-nav--mobile-menu-open fxg-wiki-nav--mobile-menu-open" : ""} ${store.searchOpen ? "fxg-nav--search-open" : ""}`}>
                                    <div className="fxg-wrapper">
                                        <Link href="/">
                                            <a
                                                className="fxg-header__logo_wrapper"
                                                target="_self"
                                                aria-label={`${APP_NAME.full} Logo`}
                                            >
                                                <Logo />
                                            </a>
                                        </Link>
                                        {/* DROPDOWN */}
                                        <Sidebar />
                                        {/* DROPDOWN END */}

                                        <div className="fdx-utilityWrap">
                                            {/* UTILITY NAV START */}
                                            <input
                                                type="hidden"
                                                id="wlgn-secure-link"
                                                defaultValue="true"
                                            />
                                            <div className="fxg-user-options">
                                                {/* USERBAR */}
                                                <div
                                                    className={`fxg-user-options__option fxg-user-options__sign-in ${store.userbarOpen ? "fxg-dropdown__item--open" : ""}`}
                                                    id="global-login-wrapper"
                                                    onClick={() => Controller.toggleUserbar()}
                                                >
                                                    <Userbar />
                                                </div>
                                                {/* USERBAR END */}
                                                <div
                                                    className="fxg-user-options__option fxg-user-options__search-btn"
                                                    onClick={() => Controller.toggleSearch()}
                                                >
                                                    <a href="#">
                                                        <img
                                                            className="fxg-user-options__icon"
                                                            alt="Search"
                                                            src="/images/resources/sprite-placeholder.png"
                                                            width="100%"
                                                            height="100%"
                                                        />
                                                    </a>
                                                </div>
                                                <button
                                                    id="fxg-mobile-menu-btn"
                                                    className={`hamburger hamburger--slider fxg-user-options__menu-btn ${store.sidebarOpen ? "is-active" : ""}`}
                                                    type="button"
                                                    onClick={() => Controller.toggleSidebar()}
                                                >
                                                    <span className="hamburger-box" tabIndex={-1}>
                                                        <span className="hamburger-inner" tabIndex={-1}>
                                                            Menu
                                                        </span>
                                                    </span>
                                                </button>
                                                {/* SEARCH */}
                                                <Search />
                                                {/* SEARCH END */}
                                            </div>
                                            {/* UTILITY NAV END */}
                                        </div>
                                    </div>
                                </nav>
                                {(store.sidebarOpen || store.userbarOpen) && (<div className="fxg-overlay" onClick={() => Controller.closeAll()}></div>)}
                                {/* GLOBAL NAV END */}
                                {/* GDPR START */}
                                {/* <fedex-cookie-consent /> */}
                                {/* GDPR END */}
                            </header>
                            {/* HEADER END */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}