import {
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';
// import plugin
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import {
  LatLong
} from './latlong.model';

declare let L;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  localCoords: LatLong;

  constructor() {
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.Routing.control({
          waypoints: [
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(57.6792, 11.949)
          ]
        }).addTo(map);
      });
    } else {
      console.log('Your browser doesnt support this shit.');
    }
  }
}
