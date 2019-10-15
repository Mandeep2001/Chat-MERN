const LOCALHOST_IP = "192.168.178.109";
const API_LINK = `http://${LOCALHOST_IP}:5000`;

const findSocketById = (array, key) => {
  Object.keys(array).forEach(_id => {
    if (_id === key) {
      return array[key];
    }
    return null;
  });
};

const getResponseApi = (req, body) => {
  return {
    href: `${API_LINK}${req.originalUrl}`,
    method: req.method,
    body: body
  };
};

const getResponseError = (req, body, error) => {
  return {
    error: { ...error },
    api: getResponseApi(req, body)
  };
};

const getResponseSuccess = (req, body, payload) => {
  return {
    payload: { ...payload },
    api: getResponseApi(req, body)
  };
};

module.exports = {
  api_link: API_LINK,
  API_LINK,
  findSocketById,
  getResponseApi,
  getResponseError,
  getResponseSuccess
};
