

export class TokenUtil {

  static gattServer = null;

  static async getToken() {
    try {
      if (!this.gattServer) {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: ['battery_service'] }]
        })
        this.gattServer = await device.gatt.connect();
      }
      const service = await this.gattServer.getPrimaryService('battery_service');
      const characteristic = await service.getCharacteristic('battery_level');
      const value = await characteristic.readValue();
      const decoder = new TextDecoder("utf-8");
      return decoder.decode(value.buffer);
    } catch (error) {
      console.log(error);
      gattServer = null
      return null;
    }

  }

}





