import { Component } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'order';
  latitude = 12;
  longitude;

  getLocation() {
    let option = { enableHighAccuracy: true, }
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      this.latitude = position.coords.latitude;
    });
  }

  getBluetoothDevice() {
    let nav: any = navigator;
    nav.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    .then(device => {
      console.log(device);
      device.gatt.connect()
    })
    .catch(error => { console.error(error); });

  }
}