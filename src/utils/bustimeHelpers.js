import axios from 'axios';

function getBusesForStop(stopId, busLine) {
  return axios.get(`http://bustime.mta.info/api/siri/stop-monitoring.json?key=3e9fe6cf-fedb-418a-91e3-ec84b6777e62&OperatorRef=MTA&MonitoringRef=${stopId}&LineRef=MTA%20NYCT_${busLine}`)
  .then(res => {
    let {
      "Siri": {
        "ServiceDelivery": {
          "StopMonitoringDelivery": [
            { "MonitoredStopVisit": busArr }
          ]
        }
      }
    } = res.data;
    if (busArr) {
      let buses = busArr.slice(0,2).map((obj) => {
        let bus = {};
        ({
          "MonitoredVehicleJourney": {
            "DirectionRef": bus.directionRef,
            "PublishedLineName": bus.name,
            "DestinationName": bus.destination,
            "MonitoredCall": {
              "ExpectedArrivalTime": bus.arrival,
              "ExpectedDepartureTime": bus.departure,
              "Extensions": {
                "Distances": {
                  "PresentableDistance": bus.distance,
                  "StopsFromCall": bus.stopsAway
                }
              }
            }
          }
        } = obj)
        return bus;
      });
      return buses;
    } else {
      return [];
    }
  })
}

function getAllBusesForStop(stopsAndBuses) {
  // TODO: no hardcoding :p
  let arrOfBusCalls = [
    getBusesForStop('552957', 'Q34'),
    getBusesForStop('551015', 'Q25'),
    getBusesForStop('551015', 'Q50'),
    getBusesForStop('501138', 'Q20A'),
    getBusesForStop('501138', 'Q20B'),
    getBusesForStop('501138', 'Q44%2B'),
    getBusesForStop('501311', 'Q16'),
  ]

  return axios.all(arrOfBusCalls)
  .then(axios.spread(function (...calls) {
    return [].concat(...calls);
  }))
}

export {getBusesForStop, getAllBusesForStop};
