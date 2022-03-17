import { useState, FormEvent } from "react"
import Input from "@/components/Input"
import { LoaderError } from "@/components/Loader"
import tabStyles from "@/styles/modules/tab.module.scss"

type State = {
    loading: boolean,
    error: boolean,
}

export const Ship = () => {
    const [state, setState] = useState<State>({ loading: false, error: false })

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setState({ loading: true, error: false })

        setTimeout(() => setState({ loading: false, error: true }), 4000)
    }

    return (
        <div
            className="fxg-app-container fxg-app--active"
            role="tabpanel"
            id="cubeOnePar-tab"
        >
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                <div className="rate_ship_app appBaseComponent aem-GridColumn aem-GridColumn--default--12">
                    <input
                        type="hidden"
                        defaultValue='{"setLvDefault":true,"lvScripts":[" "],"lvUserTraffic":"100","lvBrowserType":"chrome","lvBrowserVersion":"","lvBrowserCondition":"greater","lvAppJSmet":"","lvInitializationFnmet":"","lvLogsinPageReloadmet":"","lvLogsoutPageReloadmet":"","lvAppJSnotMet":"","lvInitializationFnNotmet":"","lvLogsinPageReloadNotmet":"","lvLogsoutPageReloadNotmet":"","mvUserTraffic":"0","mvBrowserType":"chrome","mvBrowserVersion":"","mvBrowserCondition":"greater","mvAppJSmet":"","mvInitializationFnmet":"","mvLogsinPageReloadmet":"","mvLogsoutPageReloadmet":"","mvAppJSnotMet":"","mvInitializationFnNotmet":"","mvLogsinPageReloadNotmet":"","mvLogsoutPageReloadNotmet":"","svUserTraffic":"0","svBrowserType":"chrome","svBrowserVersion":"","svBrowserCondition":"greater","svAppJSmet":"","svInitializationFnmet":"","svLogsinPageReloadmet":"","svLogsoutPageReloadmet":"","svAppJSnotMet":"","svInitializationFnNotmet":"","svLogsinPageReloadNotmet":"","svLogsoutPageReloadNotmet":"","lvURLrequestMet":"","lvURLrequestNotMet":"","mvURLrequestMet":"","mvURLrequestNotMet":"","svURLrequestMet":"","svURLrequestNotMet":"","lvDependecyType":"lvExtJS","lvExtAppHTML":"/magr/app/index.html","mvDependecyType":"mvExtJS","mvExtAppHTML":"","svDependecyType":"svExtJS","svExtAppHTML":"","isWebComponent":false}'
                        name="baseData"
                        id="app-base"
                    />
                    <div className="fxg-wrapper fxg-app__wrapper">
                        <div
                            className="fxg-app__form-wrapper fxg-app__rate-ship fxg-fullwidth"
                            id="magicRateShipApp"
                        />
                    </div>

                    <div className={tabStyles.shipContainer} style={{ height: state.loading ? 400 : undefined }}>

                        {state.loading ? (
                            <div className={tabStyles.loader} />
                        ) : (
                            <div className="fdx-u-mb--10 fdx-u-align--left max-w-xl mx-auto">
                                <div className="fdx-o-grid fdx-o-grid--max-width">
                                    <div className="fdx-o-grid__row fdx-o-grid__row--center fdx-o-grid__row--guttered-small">
                                        <div className="fdx-o-grid__item--12 fdx-o-grid__item--7@medium container-width">
                                            <div className="fdx-u-mb--8 fdx-u-align--center">
                                                <h1 id="magr-heading" className="fdx-u-font-size--h3" style={{ marginBottom: "25px" }}>
                                                    {/**/}
                                                    {/**/} Calculate OptionDelivery shipping rates.{" "}
                                                </h1>
                                                {
                                                    state.error && (
                                                        <LoaderError size="small" />
                                                    )
                                                }
                                                <form onSubmit={onSubmit} className="fxg-form input-group">
                                                    <Input label="From" name="from" />
                                                    <Input label="To" name="to" />
                                                    <button
                                                        type="submit"
                                                        className="fxg-button fxg-button--orange"
                                                    >
                                                        Rate
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}