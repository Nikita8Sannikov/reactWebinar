import { useCallback, useContext } from 'react';
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";
import { I18nContext } from '../i18n/context';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  // Вариант на внешнем состоянии
  // const store = useStore();
  // // Текущая локаль
  // const lang = useSelector(state => state.locale.lang);
  // // Функция для смены локали
  // const setLang = useCallback(lang => store.actions.locale.setLang(lang), []);
  // // Функция для локализации текстов
  // const t = useCallback((text, number) => translate(lang, text, number), [lang]);
  //
  // return {lang, setLang, t};

  // Вариант на контексте с провайдером <I18nProvider>
  return useContext(I18nContext);
}
