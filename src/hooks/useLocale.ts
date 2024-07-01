import i18next from 'i18next';

export const useLocale = (key: string) => {
  const defaultValue = null;
  const translation = i18next.t(key, {returnObjects: true});
  return translation === key ? defaultValue : translation;
};