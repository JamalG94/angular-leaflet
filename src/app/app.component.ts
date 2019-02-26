import {AfterViewInit, Component, OnInit} from '@angular/core';
// import plugin
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import {LatLong} from './latlong.model';

declare let L;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  localCoords: LatLong;

  constructor() {

  }

  ngOnInit() {

  }
  ngAfterViewInit() {
      const localCoords = this.getCoordinates();
      console.log('in ngOnInit ' + localCoords);

      const map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);


      L.Routing.control({
        waypoints: [
          L.latLng(this.getCoordinates().lat, this.getCoordinates().long),
          L.latLng(57.6792, 11.949)
        ]
      }).addTo(map);
  }

  getCoordinates(): LatLong {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let localCoords: LatLong;
        localCoords = new LatLong(position.coords.latitude, position.coords.longitude);
        console.log('in getCoordinates ' + localCoords.lat + ',' + localCoords.long);
        return localCoords;
      });
    } else {
      console.error('Geolocation is not supported by this browser!');
      return new LatLong(0, 0);
    }
  }

}
