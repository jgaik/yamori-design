import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BurgerIcon, HomeIcon } from "@yamori-design/icons";
import { bemClassNamesCreator } from "../utilities";
import { Button } from "./button";
import { LanguageSelect, LanguageSelectProps } from "./language-select";
import { Link, LinkProps } from "./link";
import { Separator } from "./separator";
import { ThemeSelect } from "./theme-select";
import { usePackageTranslation } from "../i18n";

const Links: React.FC<
  Pick<NavigationBarProps, "className" | "links" | "homeHref"> & {
    onLinkClick?: () => void;
    isCollapsed?: boolean;
  }
> = ({
  className,
  links,
  homeHref = location.origin,
  isCollapsed,
  onLinkClick,
}) => {
  const { t } = usePackageTranslation();

  return (
    <nav className={className}>
      <Link
        href={homeHref}
        onClick={onLinkClick}
        title={!isCollapsed ? t("home") : undefined}
      >
        <HomeIcon />
        {isCollapsed && t("home")}
      </Link>
      {links.map(({ onClick, ...props }) => (
        <Link
          key={props.href}
          onClick={(e) => {
            onLinkClick?.();
            onClick?.(e);
          }}
          {...props}
        />
      ))}
    </nav>
  );
};

const Controls: React.FC<
  Pick<NavigationBarProps, "className" | "languageSelectProps">
> = ({ className, languageSelectProps }) => {
  const { i18n } = useTranslation();

  return (
    <div className={className}>
      {languageSelectProps && (
        <LanguageSelect
          {...languageSelectProps}
          onChange={(lng) => {
            i18n.changeLanguage(lng);
            languageSelectProps.onChange?.(lng);
          }}
        />
      )}
      <ThemeSelect />
    </div>
  );
};

export type NavigationBarProps = Omit<
  ComponentPropsWithoutRef<"header">,
  "children"
> & {
  links: Array<LinkProps>;
  homeHref?: string;
  languageSelectProps?: LanguageSelectProps;
};

export const NavigationBar = forwardRef<
  ElementRef<"header">,
  NavigationBarProps
>(({ className, homeHref, languageSelectProps, links, ...props }, ref) => {
  const headerRef = useRef<ElementRef<"header">>(null);
  const navContainerRef = useRef<ElementRef<"div">>(null);
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const lastChecked = useRef<number>(0);

  const [isCollapsed, setIsCollapsed] = useState(false);

  useImperativeHandle(ref, () => headerRef.current as ElementRef<"header">);

  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        "navigation-bar",
        className,
        "links-container",
        "controls",
        "links",
        "dialog"
      ),
    [className]
  );

  useLayoutEffect(() => {
    if (!headerRef.current || !navContainerRef.current) return;

    const navContainerNode = navContainerRef.current;

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (isCollapsed) {
        if (entry.contentRect.width - lastChecked.current > 20) {
          lastChecked.current = 0;
          setIsCollapsed(false);
        }
      } else {
        if (lastChecked.current > entry.contentRect.width) return;
        if (navContainerNode.scrollWidth > navContainerNode.clientWidth) {
          lastChecked.current = entry.contentRect.width;
          setIsCollapsed(true);
        }
      }
    });

    resizeObserver.observe(headerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isCollapsed]);

  useLayoutEffect(() => {
    if (!isCollapsed) return;

    const dialogNode = dialogRef.current;

    const documentClickListener = (event: Event) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        dialogNode?.close();
      }
    };

    document.addEventListener("click", documentClickListener);

    return () => {
      dialogNode?.close();
      document.removeEventListener("click", documentClickListener);
    };
  }, [isCollapsed]);

  return (
    <header
      className={bemClassNames["navigation-bar"]}
      ref={headerRef}
      {...props}
    >
      {isCollapsed && (
        <Button
          aria-haspopup="menu"
          variant="primary"
          onClick={() => {
            if (dialogRef.current?.open) {
              dialogRef.current.close();
            } else {
              dialogRef.current?.show();
            }
          }}
        >
          <BurgerIcon />
        </Button>
      )}
      <div className={bemClassNames["links-container"]} ref={navContainerRef}>
        {!isCollapsed && (
          <Links
            className={bemClassNames["links"]}
            homeHref={homeHref}
            links={links}
          />
        )}
      </div>
      {!isCollapsed && (
        <Controls
          className={bemClassNames["controls"]}
          languageSelectProps={languageSelectProps}
        />
      )}
      <Separator />
      <dialog className={bemClassNames["dialog"]} ref={dialogRef}>
        <Links
          className={bemClassNames["links"]}
          homeHref={homeHref}
          links={links}
          onLinkClick={() => dialogRef.current?.close()}
          isCollapsed
        />
        <Controls
          className={bemClassNames["controls"]}
          languageSelectProps={languageSelectProps}
        />
        <Separator />
      </dialog>
    </header>
  );
});
