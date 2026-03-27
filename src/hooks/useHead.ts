import { useEffect } from "react";

type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};

type LinkTag = {
  rel: string;
  href: string;
};

export function useHead({
  title,
  meta = [],
  link = [],
}: {
  title?: string;
  meta?: MetaTag[];
  link?: LinkTag[];
}) {
  useEffect(() => {
    // TITLE
    if (title) {
      document.title = title;
    }

    // META TAGS
    meta.forEach((m) => {
      const selector = m.name
        ? `meta[name="${m.name}"]`
        : `meta[property="${m.property}"]`;

      let tag = document.querySelector(selector) as HTMLMetaElement | null;

      if (!tag) {
        tag = document.createElement("meta");
        if (m.name) tag.setAttribute("name", m.name);
        if (m.property) tag.setAttribute("property", m.property);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", m.content);
    });

    // LINK TAGS
    link.forEach((l) => {
      const selector = `link[rel="${l.rel}"]`;
      let tag = document.querySelector(selector) as HTMLLinkElement | null;

      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", l.rel);
        document.head.appendChild(tag);
      }

      tag.setAttribute("href", l.href);
    });
  }, [title, meta, link]);
}
