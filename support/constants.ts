export enum TIMEOUTS {
  EMAIL_RECEIVED = 10000,
  IFRAME_CLICK = 700,
  IFRAME_TYPE_DELAY = 50,
  TEXT_PRESENCE = 5000,
  TEXT_ABSENCE = 500,
  MODAL_PRESENCE = 3000,
  MODAL_ABSENCE = 1000,
  EMAILS_PRESENCE = 10000,
  QUERY_DELAY = 1000,
  ELEMENT_CLICK = 1000,
}

export const PATHS = {
  RESOURCES: "resources",
  API_TEST_DATA: "resources/apiTestData/",
  CLIENTS: "resources/users/clients.json",
  TEMP: "temp/",
};

export const URLS = {
  MAILHOG: 'http://192.168.242.232:8025/',
  NOTIFICATIONS: 'https://develop.google.com/test/notificationstest/indexpush',
}
