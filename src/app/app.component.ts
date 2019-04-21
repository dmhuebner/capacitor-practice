import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { bindCallback, Observable } from 'rxjs';
import {map} from 'rxjs/operators';

const { Geolocation, Modals } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  coords: Coordinates;

  ngOnInit(): void {
    this.watchPosition().subscribe(pos => {
      this.coords = pos.coords;
    });
  }

  watchPosition(): Observable<any> {
    return bindCallback(Geolocation.watchPosition)({});
  }

  showAlert() {
    const lat = this.coords.latitude;
    const lng = this.coords.longitude;

    Modals.alert({
      title: 'Your Position',
      message: `Lat: ${lat}, Lng: ${lng}`
    });
  }
}
