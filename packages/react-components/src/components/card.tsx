"use client";

import { ComponentPropsWithRef, ReactNode, useMemo } from "react";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/components/card.css";

export type CardProps = ComponentPropsWithRef<"article"> & {
  image?: ReactNode;
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
  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        ["card", { clickable: !!onClick }],
        className,
        "section",
        "image"
      ),
    [className, onClick]
  );

  return (
    <article className={bemClassNames["card"]} onClick={onClick} {...props}>
      {image && (
        <div role="presentation" className={bemClassNames["image"]}>
          {image}
        </div>
      )}
      <section className={bemClassNames["section"]}>
        <h5>{header}</h5>
        {children}
      </section>
    </article>
  );
};
