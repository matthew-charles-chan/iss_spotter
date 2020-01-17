const { fetchMyIP, fetchCoordsByIP } = require('./iss');

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