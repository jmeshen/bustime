import axios from 'axios';

function getBusesForStop() {
  return axios.get(`http://bustime.mta.info/api/siri/stop-monitoring.json?key=3e9fe6cf-fedb-418a-91e3-ec84b6777e62&OperatorRef=MTA&MonitoringRef=501138&LineRef=MTA%20NYCT_Q20A`)
  .then(res => {
    let {
      "Siri": {
        "ServiceDelivery": {
          "StopMonitoringDelivery": [
            { "MonitoredStopVisit": sup }
          ]
        }
      }
    } = res.data;
    let arr = sup.map((obj) => {
      let autobus = {};
      ({
        "MonitoredVehicleJourney": {
          "DirectionRef": autobus.directionRef,
          "PublishedLineName": autobus.name,
          "DestinationName": autobus.destination,
          "MonitoredCall": {
            "ExpectedArrivalTime": autobus.arrival,
            "ExpectedDepartureTime": autobus.departure,
            "Extensions": {
              "Distances": {
                "PresentableDistance": autobus.distance,
                "StopsFromCall": autobus.stopsAway
              }
            }
          }
        }
      } = obj)
      return autobus;
    });
    return arr;
  })
}

export {getBusesForStop};
