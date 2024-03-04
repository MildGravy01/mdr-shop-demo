import DOMPurify from "dompurify";

export const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html, {
      USE_PROFILES: {html: true},
    });
  };