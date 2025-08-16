"use client";

import React, {
  ComponentRef,
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { Link, NavigationBar, NavigationBarProps } from "../components";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/layouts/navigation-bar-layout.css";

export type NavigationBarLayoutProps = PropsWithChildren<NavigationBarProps> & {
  githubHref?: string;
};

export const NavigationBarLayout: React.FC<NavigationBarLayoutProps> = ({
  children,
  className,
  githubHref,
  ...props
}) => {
  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        "navigation-bar-layout",
        className,
        "header",
        "content",
        "footer"
      ),
    [className]
  );

  const navBarRef = useRef<ComponentRef<typeof NavigationBar>>(null);
  const contentRef = useRef<ComponentRef<"div">>(null);
  const footerRef = useRef<ComponentRef<"footer">>(null);

  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    if (!navBarRef.current || !contentRef.current || !footerRef.current) return;

    const navBar = navBarRef.current;
    const content = contentRef.current;
    const footer = footerRef.current;

    const resizeObserver = new ResizeObserver(() => {
      content.style.top = `${navBar.clientHeight}px`;
      content.style.bottom = `${footer.clientHeight}px`;
    });

    resizeObserver.observe(footer);
    resizeObserver.observe(navBar);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={bemClassNames["navigation-bar-layout"]}>
      <NavigationBar
        ref={navBarRef}
        className={bemClassNames["header"]}
        {...props}
      />
      <div ref={contentRef} className={bemClassNames["content"]}>
        {children}
      </div>
      <footer ref={footerRef} className={bemClassNames["footer"]}>
        <address>
          <small>
            © {year} Jakub Gaik (
            <Link href="https://github.com/jgaik" target="_blank">
              @jgaik
            </Link>
            )
          </small>
        </address>
        {githubHref && (
          <Link href={githubHref} target="_blank">
            <img
              className="github"
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
            />
          </Link>
        )}
      </footer>
    </div>
  );
};
