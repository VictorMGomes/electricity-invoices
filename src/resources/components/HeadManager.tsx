import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function HeadManager() {
  const location = useLocation();
  const { pathname } = location;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const key =
      pathname === '/' ? 'home' : pathname.slice(1).replace(/\//g, '.');
    const titleKey = `meta.${key}.title`;
    const descriptionKey = `meta.${key}.description`;

    const title = t(titleKey) + " | Eletricity Invoices";
    const description = t(descriptionKey);

    if (title && title !== titleKey) {
      document.title = title;
    }

    const metaTags: { name: string; content: string }[] = [];

    if (description && description !== descriptionKey) {
      metaTags.push({ name: 'description', content: description });
    }

    const createdMetaTags = metaTags.map(({ name, content }) => {
      let tag = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
      return tag;
    });

    const html = document.documentElement;
    const prevLang = html.getAttribute('lang');
    html.setAttribute('lang', i18n.language);

    return () => {
      createdMetaTags.forEach((tag) => {
        document.head.removeChild(tag);
      });

      if (prevLang) {
        html.setAttribute('lang', prevLang);
      } else {
        html.removeAttribute('lang');
      }
    };
  }, [pathname, t, i18n.language]);

  return null;
}
