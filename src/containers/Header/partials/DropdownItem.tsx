import { useMediaQuery } from "@web/hooks/useMediaQuery";
import { Controller, Tab, useStore } from "../store";
import {
  DropdownSubMenuFooter,
  DropdownSubMenuItem,
  SubMenuProps,
} from "./DropdownSubMenu";

type Props = {
  title: string;
  items: SubMenuProps[];
  footer: SubMenuProps;
  tab: Tab;
};

export const DropdownItem = ({ title, items, footer, tab }: Props) => {
  const { activeTab } = useStore();

  const smallScreen = useMediaQuery("(max-width: 992px)");

  return (
    <div className="dropdown aem-GridColumn aem-GridColumn--default--12">
      {/* DROPDOWN START */}
      <ul className="fxg-dropdown__list">
        <li
          className={`fxg-dropdown__item ${
            activeTab === tab ? "fxg-dropdown__item--open" : ""
          }`}
        >
          <a
            href="#"
            aria-label="Open Shipping Menu"
            className="fxg-link fxg-dropdown-js "
            target="_self"
            onClick={() => Controller.toggleTab(tab, !smallScreen)}
          >
            <span className="fxg-mouse" tabIndex={-1}>
              {title}
            </span>
          </a>
          <div className="fxg-dropdown__sub-menu">
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
              {items.map((item, i) => (
                <DropdownSubMenuItem
                  key={i}
                  title={item.title}
                  href={item.href}
                  isFirst={i === 0}
                />
              ))}
              <DropdownSubMenuFooter title={footer.title} href={footer.href} />
            </div>
          </div>
        </li>
      </ul>
      {/* DROPDOWN END */}
    </div>
  );
};
