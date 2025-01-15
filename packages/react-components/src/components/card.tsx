import {
  cloneElement,
  ComponentPropsWithRef,
  ComponentRef,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/components/card.css";

export type CardProps = ComponentPropsWithRef<"article"> & {
  image?: ReactElement<ComponentPropsWithRef<"img">>;
  header: ReactNode;
};

export const Card: React.FC<CardProps> = ({
  className,
  image,
  header,
  children,
  onClick,
  ...props
}) => {
  const sectionRef = useRef<ComponentRef<"section">>(null);
  const imgRef = useRef<ComponentRef<"img">>(null);

  useLayoutEffect(() => {
    if (!image || !sectionRef.current || !imgRef.current) return;

    const img = imgRef.current;

    const observer = new ResizeObserver(([entry]) => {
      img.style.height = `${entry.contentRect.height}px`;
    });

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [image]);

  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        ["card", { clickable: !!onClick }],
        className,
        "section"
      ),
    [className, onClick]
  );

  return (
    <article className={bemClassNames["card"]} onClick={onClick} {...props}>
      <section className={bemClassNames["section"]} ref={sectionRef}>
        <h5>{header}</h5>
        <p>{children}</p>
      </section>
      {image && cloneElement(image, { ref: imgRef })}
    </article>
  );
};
