import React, {
  ComponentRef,
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { NavigationBar, NavigationBarProps } from "../components";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/layouts/navigation-bar-layout.css";

export type NavigationBarLayoutProps = PropsWithChildren<NavigationBarProps>;

export const NavigationBarLayout: React.FC<NavigationBarLayoutProps> = ({
  children,
  className,
  ...props
}) => {
  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        "navigation-bar-layout",
        className,
        "header",
        "content"
      ),
    [className]
  );

  const navBarRef = useRef<ComponentRef<typeof NavigationBar>>(null);
  const contentRef = useRef<ComponentRef<"div">>(null);

  useLayoutEffect(() => {
    if (!navBarRef.current || !contentRef.current) return;

    const navBar = navBarRef.current;
    const content = contentRef.current;

    const resizeObserver = new ResizeObserver(() => {
      content.style.top = `${navBar.clientHeight}px`;
    });

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
    </div>
  );
};
