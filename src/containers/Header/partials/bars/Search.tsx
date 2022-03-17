import { ChangeEvent, FormEvent, useState } from "react"
import { Controller } from "../../store"

export const Search = () => {
    const [search, setSearch] = useState("")

    const onSubmit = () => {
        if (!search || search.length < 2) return
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onSubmit()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="fxg-search">
            <div className="fxg-user-options__option fxg-user-options__search js-fxg-search">
                <div className="fxg-user-options__search__input">
                    <form
                        className="fxg-form"
                        id="fxg-search-header"
                        onSubmit={handleSubmit}
                    >
                        <label
                            htmlFor="fxg-search-text"
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                display: "none"
                            }}
                        />
                        <input
                            type="text"
                            id="fxg-search-text"
                            className="fxg-user-options__search-field fxg-search-js search_closeMark"
                            placeholder="Search or Tracking Numbers"
                            title="Search or Tracking Numbers"
                            aria-label="Search or Tracking Numbers"
                            value={search}
                            onChange={handleChange}
                        />
                        <input type="hidden" id="fxg-track-url" />
                        <input type="hidden" id="fxg-search-url" />
                        <a
                            href="#"
                            id="fxg-search-icon"
                            className="fxg-search-icon js-fxg-search-btn"
                            aria-label="Search"
                            onClick={onSubmit}
                        >
                            <img
                                className="fxg-user-options__icon fxg-search-btn"
                                alt="Search"
                                src="/images/resources/sprite-placeholder.png"
                                width="100%"
                                height="100%"
                            />
                        </a>
                    </form>
                </div>
                <a
                    href="#"
                    className="fxg-search-close-btn"
                    aria-label="Exit Search "
                    onClick={() => Controller.toggleSearch()}
                >
                    <span className="fxg-mouse" tabIndex={-1}>
                        <img
                            className="fxg-user-options__icon fxg-close-btn"
                            alt="Exit Search "
                            src="/images/resources/sprite-placeholder.png"
                            width="100%"
                            height="100%"
                        />
                    </span>
                </a>
            </div>
        </div>
    )
}