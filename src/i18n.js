import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
const resources = {
  en: {
    translation: {
      signin: 'Sign In',
      signup: 'Sign Up',
      required: 'This field is required',
      welcome: 'Welcome',
      Conferences: 'Conferences',
      Location: 'Location',
      Uploading: 'Uploading',
      Area: `Support for a single or bulk upload. Strictly prohibit from
      uploading company data or other band files`,
      Description: 'Description',
      Preview: 'Preview',
      'Publish Conference': 'Publish Conference',
      'Description Placeholder':
        'Write a short conference summary to get attendees excited.',
      'Description Detail':
        'Write a short event summary to get attendees excited',
      'Files Title': 'Files',
      'Files Desc': 'Upload files to display them on preview page',
      'Area Upload': 'Click or drag file to this area to upload',
      'Main Conference Image': 'Main Conference Image',
      'Image Desc':
        'This is the first image attendees will see at the top of your listing.',
      'Start Date': 'Start date',
      'End Date': 'End date',
      'Start Time': 'Start time',
      'End Time': 'End time',
      'Start and end times': 'Start and end times',
      'Date Required': 'Please select the date',
      'Time Required': 'Please select the time',
      'Date and time': 'Date and time',
      'Date Description':
        'Tell event-goers when your event starts and ends so they can make plans to attend',
      'Enter address': 'Enter address',
      'Location Description':
        'Help people in the area discover your event and let attendees know where to show up.',
      'Organizer Info': 'Tell attendees who is organizing this event',
      'Please enter organizer info': 'Please enter organizer info',
      'Basic Info': 'Basic Info',
      'Enter conference name': 'Enter conference name',
      'Event Description':
        'Name your event and tell event-goers why they should come. Add details that highlight what makes it unique',
      'Create conference': 'Create conference',
      'Please provide conference title': 'Please provide conference title',
      'Sign In': 'Sign In',
      'Sign Up': 'Sign Up',
      'Create an account': 'Create an account',
      'Signin In': 'Signin In',
      'Enter your email': 'Enter your email',
      'Enter your name': 'Enter your name',
      'Enter your password': 'Enter your password',
      'Use email to get started': 'Use email to get started',
      'Please enter a valid email address':
        'Please enter a valid email address',
      'Onboarding Warning': `By clicking \"Sign In\" or \"Sign Up\", I accept the Sarpo Terms
      Of Service, Community Guidelines and have read the Privacy Policy.`,
    },
  },
  ua: {
    translation: {
      signin: 'Авторизуватись',
      signup: 'Реєстрація',
      required: "Це поле обов'язкове",
      welcome: 'Ласкаво просимо',
      Conferences: 'Конференції',
      Location: 'Місце проведення',
      Uploading: 'Завантажується',
      Area: 'Підтримка завантаження одного файлу',
      Description: 'Опис',
      Preview: 'Перегляд',
      'Publish Conference': 'Опублікувати конференцію',
      'Description Detail': 'Напишіть короткий підсумок події',
      'Description Placeholder': 'Введіть короткий підсумок',
      'Files Title': 'Файли',
      'Files Desc':
        'Завантажте файли, щоб відобразити їх на сторінці перегляду',
      'Area Upload':
        'Натисність або перетягніть файл до цієї області для завантаження',
      'Main Conference Image': 'Головне тематичне зображення',
      'Image Desc':
        'Це перше зображення, яке відвідувачі побачать у верхній частині вашого списку.',
      'Start Date': 'Дата початку',
      'End Date': 'Дата закінчення',
      'Start Time': 'Час початку',
      'End Time': 'Час закінчення',
      'Start and end times': 'Дати початку та кінця заходу',
      'Date Required': 'Будь ласка, виберіть дату',
      'Time Required': 'Будь ласка, виберіть час',
      'Date and time': 'Дата та час',
      'Date Description':
        'Повідомте учасників подій, коли ваша подія починається і закінчується, щоб вони могли скласти плани відвідувати',
      'Enter address': 'Вкажіть адресу',
      'Location Description': 'Вкажіть місце проведення конференції',
      'Organizer Info': 'Введіть інформацію про організатора',
      'Please enter organizer info':
        'Будь ласка, введіть інформацію про організатора',
      'Basic Info': 'Загальна інформація',
      'Enter conference name': 'Введіть назву конференції',
      'Event Description':
        'Опишіть свою подію та скажіть учасникам подій, чому вони повинні прийти. Додайте деталі, які підкреслюють те, що робить його унікальним',
      'Create conference': 'Створити конференцію',
      'Please provide conference title': 'Вкажіть назву конференції',
      'Sign In': 'Авторизація',
      'Sign Up': 'Зареєструватись',
      'Create an account': 'Створити акаунт',
      'Signin In': 'Авторизуємо',
      'Enter your email': 'Введіть пошту',
      'Enter your name': "Введіть ім'я",
      'Enter your password': 'Введіть пароль',
      'Use email to get started': 'Використовуйте пошту для початку роботи',
      'Please enter a valid email address': 'Введіть коректну адресу пошти',
      'Onboarding Warning': `Натискаючи \"Авторизуватись\" або \"Реєстрація\", я приймаю умови Sarpo 
      про послуги, принципи спільноти та ознайомився з політикою конфіденційності.`,
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
