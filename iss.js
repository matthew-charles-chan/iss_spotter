
const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP.\nResponse:\n  ${body}`;
      callback(Error(msg), null);
      return;
    }
    const latitude = (JSON.parse(body).lat);
    const longitude = (JSON.parse(body).lon);
    const coordinates = {"latitude": latitude, "longitude": longitude};
    callback(null, coordinates);
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const OHPPs = JSON.parse(body).response;
    callback(null, OHPPs);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coord) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coord, (error, OHPPs) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, OHPPs);
      });
    });
  });
};



// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

module.exports = { nextISSTimesForMyLocation };