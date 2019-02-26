import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
// import plugin
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import {LatLong} from './latlong.model';

declare let L;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  localCoords: LatLong;
  givenCoords: LatLong;

  constructor() {
  }

  ngOnInit() {
    this.getCoordinates();
  }

  getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.localCoords = new LatLong(position.coords.latitude, position.coords.longitude);
        const map = this.createMap(this.localCoords.lat, this.localCoords.long, 14);

        this.setTileLayer(map);

        this.setMarkers(map);

      });
    } else {
      console.log('Your browser doesnt support this shit.');
    }
  }

  createMap(lat: number, long: number, zoom: number) {
    return L.map('map').setView([lat, long], zoom);
  }

  setTileLayer(map) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }

  setMarkers(map) {
    L.Routing.control({
      waypoints: [
        L.latLng(this.localCoords.lat, this.localCoords.long),
        L.latLng(57.6792, 11.949)
      ]
    }).addTo(map);
  }
}
