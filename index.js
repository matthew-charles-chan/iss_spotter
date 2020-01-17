// const request = require("request");
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP('162.245.144.188', (err, coord) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log("It worked! My coordinates are:", coord);
// });

// fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.09230' }, (err, ohpp) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log("It worked! Overhead pass predictions are:", ohpp)
// });

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, OHPPs) => {
  if (error) {
    return console.log("It didn't work!:", error);
  }
  for (let pass of OHPPs) {
    let a = new Date(pass.risetime * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const nextPass = `Next pass on ${month} ${date}, ${year} at ${hour}:${min}:${sec} for ${pass.duration} seconds!`;
    console.log(nextPass);
  }
});

