import { Component, OnInit } from '@angular/core';
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
  jwtToken;
  server;

  getLocation() {
    let option = { enableHighAccuracy: true, }
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }

  getGATTServer() {
    let nav: any = navigator;
    nav.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }]
    })
      .then(device => {
        console.log(device)
        return device.gatt.connect();
      })
      .then(server => {
        this.server = server;
      })
      .catch()
  }
  getJWT() {
    let nav: any = navigator;
    nav.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }]
    })
      .then(device => {
        console.log(device)
        return device.gatt.connect();
      })
      .then(server => {
        return server.getPrimaryService('battery_service');
      })
      .then(service => {
        return service.getCharacteristic('battery_level');
      })
      .then(characteristic => {
        return characteristic.readValue();
      })
      .then(value => {
        let enc = new TextDecoder("utf-8");
        this.jwtToken = enc.decode(value.buffer);
      })
      .catch()

  }
}