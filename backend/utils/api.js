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

module.exports = {
  api_link: API_LINK,
  findSocketById
};
