import { trpc } from "@web/api/trpc";
import { useOptionalAuth } from "@web/middlewares/auth";
import { useRouter } from "next/navigation";
import {
  DropdownSubMenuButtonFooter,
  DropdownSubMenuFooter,
  DropdownSubMenuItem,
  DropdownSubMenuRichText,
} from "../DropdownSubMenu";

export const Userbar = () => {
  const router = useRouter();
  const auth = useOptionalAuth();

  const logoutMutation = trpc.auth.logout.useMutation();

  const logout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess() {
        router.push("/");
      },
    });
  };

  return (
    <>
      <a href="#" className="fxg-link fxg-dropdown-js" id="fxg-dropdown-signIn">
        <span aria-hidden="true" className="fxg-user-options__sign-in-text">
          {auth ? auth.fullName : "Sign Up or Log In"}{" "}
          {logoutMutation.isLoading && "..."}
        </span>
        <img
          className="fxg-user-options__icon"
          alt={auth ? auth.fullName : "Sign Up or Log In"}
          src="/images/resources/sprite-placeholder.png"
          width="100%"
          height="100%"
        />
      </a>
      <div
        className="fxg-dropdown__sub-menu utility-nav-dropdown__sub-menu"
        data-util-nav-jcr-path="/content/experience-fragments/fedex-com/global/en_us/header/master/jcr:content/root/headerv2/global_nav/utility_navigation"
      >
        <div className="wlgnlink-class">
          <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
            {auth ? (
              <DropdownSubMenuButtonFooter onClick={logout} title="Logout" />
            ) : (
              <DropdownSubMenuFooter
                title="SIGN UP / LOG IN"
                href="/secure/login"
              />
            )}
            <DropdownSubMenuItem title="My profile" href="/profile" />
            <DropdownSubMenuItem title="Administrative tools" href="/manager" />
            <DropdownSubMenuItem
              title="Email preferences"
              href="/preferences"
            />
            <DropdownSubMenuItem title="Address book" href="/address-book" />
            <DropdownSubMenuItem
              title="View &amp; pay bill"
              href="/billing-online"
            />
            <DropdownSubMenuItem title="Reporting" href="/reporting-online" />
            <DropdownSubMenuRichText
              title="Open an account"
              href="/open-account"
              desc="to save 30% off ExpressGlob Express®, access time-saving tools and more!"
            />
          </div>
        </div>
      </div>
    </>
  );
};
