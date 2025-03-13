"use client";

import {
  ComponentPropsWithRef,
  ComponentRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BurgerIcon, HomeIcon } from "@yamori-design/icons";
import { useIsClient } from "@yamori-shared/react-utilities";
import { bemClassNamesCreator } from "../utilities";
import { Button } from "./button";
import { LanguageSelect, LanguageSelectProps } from "./language-select";
import { Link, LinkProps } from "./link";
import { ThemeSelect } from "./theme-select";
import { usePackageTranslation } from "../i18n";
import { FloatingPortalProps } from "@floating-ui/react";
import "@yamori-design/styles/dist/components/navigation-bar.css";

const Links: React.FC<
  Pick<NavigationBarProps, "className" | "links" | "homeHref"> & {
    onLinkClick?: () => void;
    isCollapsed?: boolean;
  }
> = ({ className, links, homeHref, isCollapsed, onLinkClick }) => {
  const { t } = usePackageTranslation();
  const isClient = useIsClient();

  return (
    <nav className={className}>
      <Link
        href={homeHref ?? (isClient ? window.location.origin : undefined)}
        onClick={onLinkClick}
        title={!isCollapsed ? t("home") : undefined}
      >
        <HomeIcon />
        {isCollapsed && t("home")}
      </Link>
      {links?.map((link) =>
        isValidElement(link) ? (
          link
        ) : (
          <Link
            {...link}
            key={link.href}
            onClick={(e) => {
              onLinkClick?.();
              link.onClick?.(e);
            }}
          />
        )
      )}
    </nav>
  );
};

const Controls: React.FC<
  Pick<
    NavigationBarProps,
    "className" | "controls" | "languageSelectProps" | "githubHref"
  > & {
    portalProps?: FloatingPortalProps;
  }
> = ({ className, controls, languageSelectProps, portalProps, githubHref }) => {
  const { i18n } = useTranslation();

  return (
    <div className={className}>
      {controls}
      {githubHref && (
        <Link href={githubHref} target="_blank">
          <img
            className="github"
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            alt="GitHub"
          />
        </Link>
      )}
      {languageSelectProps && (
        <LanguageSelect
          {...languageSelectProps}
          onChange={(lng) => {
            i18n.changeLanguage(lng);
            languageSelectProps.onChange?.(lng);
          }}
          portalProps={portalProps}
        />
      )}
      <ThemeSelect portalProps={portalProps} />
    </div>
  );
};

export type NavigationBarProps = Omit<
  ComponentPropsWithRef<"header">,
  "children"
> & {
  controls?: ReactNode;
  links?: Array<LinkProps | ReactElement>;
  homeHref?: string;
  languageSelectProps?: Omit<LanguageSelectProps, "portalProps">;
  githubHref?: string;
};

export const NavigationBar: React.FC<NavigationBarProps> = ({
  className,
  controls,
  homeHref,
  languageSelectProps,
  links,
  githubHref,
  ref,
  ...props
}) => {
  const headerRef = useRef<ComponentRef<"header">>(null);
  const navContainerRef = useRef<ComponentRef<"div">>(null);
  const dialogRef = useRef<ComponentRef<"dialog">>(null);
  const lastChecked = useRef<number>(0);

  const [isCollapsed, setIsCollapsed] = useState(false);

  useImperativeHandle(ref, () => headerRef.current as ComponentRef<"header">);

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

  const controlsProps = {
    languageSelectProps,
    githubHref,
    className: bemClassNames["controls"],
    controls,
  };

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
      <div className={bemClassNames["links-container"]} ref={navContainerRef}>
        {!isCollapsed && (
          <Links
            className={bemClassNames["links"]}
            homeHref={homeHref}
            links={links}
          />
        )}
      </div>
      {!isCollapsed && <Controls {...controlsProps} />}
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
      <dialog
        id="navigation-bar-dialog"
        className={bemClassNames["dialog"]}
        ref={dialogRef}
      >
        <Links
          className={bemClassNames["links"]}
          homeHref={homeHref}
          links={links}
          onLinkClick={() => dialogRef.current?.close()}
          isCollapsed
        />
        <Controls
          {...controlsProps}
          portalProps={{ id: "navigation-bar-dialog" }}
        />
      </dialog>
    </header>
  );
};
