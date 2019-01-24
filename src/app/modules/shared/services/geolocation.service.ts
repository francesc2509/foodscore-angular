import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {
    getLocation(): Observable<Coordinates> {
        return from(new Promise<Coordinates>(
            (resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        resolve(pos.coords);
                    },
                    (err) => resolve(<Coordinates>{ latitude: 0, longitude: 0 })
                );
            }
        ));
    }
}
