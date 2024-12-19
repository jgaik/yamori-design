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
import { Link } from "./link";
import { Separator } from "./separator";
import { ThemeSelect } from "./theme-select";

export type NavigationBarLink = {
  href: string;
  label: string;
};

const NavigationList: React.FC<
  Pick<NavigationBarProps, "links" | "homeHref"> & { onLinkClick?: () => void }
> = ({ links, homeHref = location.origin, onLinkClick }) => {
  return (
    <nav>
      <Link href={homeHref} onClick={onLinkClick}>
        <HomeIcon />
      </Link>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} onClick={onLinkClick}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export type NavigationBarProps = ComponentPropsWithoutRef<"header"> & {
  links: Array<NavigationBarLink>;
  homeHref?: string;
  languageSelectProps?: LanguageSelectProps;
};

export const NavigationBar = forwardRef<
  ElementRef<"header">,
  NavigationBarProps
>(
  (
    { children: _, className, homeHref, languageSelectProps, links, ...props },
    ref
  ) => {
    const { i18n } = useTranslation();

    const headerRef = useRef<ElementRef<"header">>(null);
    const navContainerRef = useRef<ElementRef<"div">>(null);
    const dialogRef = useRef<ElementRef<"dialog">>(null);
    const lastChecked = useRef<number>(0);

    const [isCollapsed, setIsCollapsed] = useState(false);

    useImperativeHandle(ref, () => headerRef.current as ElementRef<"header">);

    const bemClassNames = useMemo(
      () =>
        bemClassNamesCreator.create(
          ["navigation-bar", { collapsed: isCollapsed }],
          className
        ),
      [className, isCollapsed]
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
        <div ref={navContainerRef}>
          {!isCollapsed && <NavigationList homeHref={homeHref} links={links} />}
        </div>
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
        <Separator />
        <dialog ref={dialogRef}>
          <NavigationList
            homeHref={homeHref}
            links={links}
            onLinkClick={() => dialogRef.current?.close()}
          />
          <Separator />
        </dialog>
      </header>
    );
  }
);
