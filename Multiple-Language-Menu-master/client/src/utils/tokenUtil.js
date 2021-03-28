

export class TokenUtil {

  static gattServer = null;

  static async getToken() {
    if(!this.gattServer){

      this.gattServer = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['battery_service'] }]
      })
      .then(device => {
        return device.gatt.connect();
      })
    }
    let token = await this.gattServer.getPrimaryService('battery_service')
    .then(service => {
      return service.getCharacteristic('battery_level');
    })
    .then(characteristic => {
      return characteristic.readValue();
    })
    let enc = new TextDecoder("utf-8");
    // console.log(enc.decode(token.buffer))
    return enc.decode(token.buffer);
  }

}





