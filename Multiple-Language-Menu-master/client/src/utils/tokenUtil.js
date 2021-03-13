let GATTServer

const getGATTServer = () => {
  return new Promise((resolve, reject) => {
    if (!GATTServer) {
      navigator.bluetooth.requestDevice({
        filters: [{ services: ['battery_service'] }]
      })
        .then(device => {
          return device.gatt.connect();
        })
        .then(server => {
          GATTServer = server;
          resolve(server);
        })
        .catch(e => {
          reject(e);
        })
    } else {
      resolve(GATTServer);
    }
  })
};

export const getJWT = () => {
  return new Promise((resolve, reject) => {
    let jwtToken;
    getGATTServer()
      .then(server => {
        return server.getPrimaryService('battery_service')
      })
      .then(service => {
        return service.getCharacteristic('battery_level');
      })
      .then(characteristic => {
        return characteristic.readValue();
      })
      .then(value => {
        let enc = new TextDecoder("utf-8");
        jwtToken = enc.decode(value.buffer);
        resolve(jwtToken);
      })
      .catch(e => { reject(e)})
  })
}
