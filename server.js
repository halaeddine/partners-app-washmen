const express = require('express');
const app = express();
const port = 3070;
const fs = require('fs');
const _ = require('lodash');
const lat = 51.5144636;
const lon = -0.142571;
let partners;
fs.readFile('./partners.json', function (err, data) {
    if (err) throw err;
    partners = JSON.parse(data);
  });

const filteredPartners = [];
app.get('/', (req,res) => {
    res.send("app is working");
});

app.get('/api/partners', (req, res) => {
    let _distance = req.query.distance;
    filteredPartners.splice(0,filteredPartners.length); //empty array;
    let officeIndexes = [];
    partners.forEach(val => {
        val.offices.forEach((office, index)=>{
            let fullCoordinates = office.coordinates;
            let objLat = fullCoordinates.split(",")[0];
            let objLon = fullCoordinates.split(",")[1];
            let calculatedDistance = calcDistance(lat, lon, objLat, objLon);
            if(calculatedDistance <= _distance){
                filteredPartners.push(val);
            }
        })
    });
  res.json(_.orderBy(_.uniqBy(filteredPartners,'id'),'organization','asc'));
});

function calcDistance(lat1, lon1, lat2, lon2){
    const R = 6371; // Kilometres
    const rLat1 = lat1 * Math.PI/180; // φ, λ in radians
    const rLat2 = lat2 * Math.PI/180;
    const dLat = (lat2-lat1) * Math.PI/180;
    const dLng = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(rLat1) * Math.cos(rLat2) *
          Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // in K metres
    return d;
}
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});