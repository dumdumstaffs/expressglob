import { ChangeEvent, FormEvent, useState } from "react"

import tabStyles from "@/styles/modules/tab.module.scss"

type State = {
    loading: boolean,
    error: null | string,
    search: string
}

export const Location = () => {
    const [state, setState] = useState<State>({ loading: false, error: null, search: "" })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!state.search || state.search.length < 2) return setState({ ...state, error: "Please enter ZIP OR CITY, STATE" })

        setState({ ...state, loading: true })

        const redirect = () => window.location.href = `https://www.google.com/maps/search/${state.search}`

        setTimeout(redirect, 3000)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, error: null, search: e.target.value })
    }

    return (
        <div
            className="fxg-app-container fxg-app--active"
            role="tabpanel"
            id="cubeThreePar-tab"
        >
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                <div className="locations_app appBaseComponent aem-GridColumn aem-GridColumn--default--12">
                    <div className="fxg-wrapper fxg-app__wrapper">
                        <div className="fxg-app__single-tracking">
                            <div className="fxg-app__form-wrapper fxg-app__location">
                                <form
                                    className="fxg-form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="fxg-field">
                                        <label
                                            htmlFor="HomepageLocationsAppInput"
                                            style={{ display: "none" }}
                                        >
                                            Zip or City, State
                                        </label>
                                        <input
                                            type="text"
                                            id="HomepageLocationsAppInput"
                                            className="fxg-field__input-text fxg-field__input--required fxg-input__autocomplete"
                                            required
                                            aria-label="Zip or City, State"
                                            aria-required="true"
                                            name="search"
                                            value={state.search}
                                            onChange={handleChange}
                                        />
                                        <span
                                            className="fxg-field__placeholder fxg-field__floating-placeholder"
                                            style={{ color: state.error ? "red" : undefined }}
                                        >
                                            {state.error || "Zip or City, State"}
                                        </span>
                                    </div>
                                    <button
                                        type="submit"
                                        className="fxg-button fxg-button--orange"
                                    >
                                        Find Location
                                    </button>
                                </form>
                                <div className="fxg-locations-app__links-par"></div>
                            </div>

                            {state.loading && (
                                <div className={tabStyles.locationContainer}>
                                    <div className={tabStyles.loader} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}