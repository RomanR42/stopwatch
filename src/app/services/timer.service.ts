import { Injectable } from '@angular/core';
import {Observable, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  
  serviceTimer:Observable<number>;

  getTimer (step:number):Observable<number> {
    this.serviceTimer = timer(0, step);
    return this.serviceTimer;
  }

  

  
}
