import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import deTranslation from '../assets/languages/german.language.json'
import esTranslation from '../assets/languages/spanish.language.json'

const resources = {
  es: {
    translation: esTranslation,
  },
  de:{
    translation: deTranslation,
  }
}
i18n.use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      interpolation: {
        escapeValue:false,
      }
    })

export default i18n;