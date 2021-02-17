import { Component } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'order';
  latitude;
  longitude;
  battery;

  getLocation() {
    let option = { enableHighAccuracy: true, }
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }

  getBluetoothDevice() {
    let nav: any = navigator;
    nav.bluetooth.requestDevice({
      filters: [{services: ['battery_service']}]
    })
    .then(device => {
      return device.gatt.connect();
    })
    .then(server => {
      console.log(server)
      return server.getPrimaryService('battery_service');
    })
    .then(service => {
      return service.getCharacteristic('battery_level');
    })
    .then(characteristic => {
      return characteristic.readValue();
    })
    .then(value => {
      this.battery = value.getUint8(0);
    })
    .catch()

  }
}