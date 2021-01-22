import { Component, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  flag = true;
  start () {
    let  counter = 0
    
    const myTimer = timer(0, 1000).subscribe(data => console.log(data))
    
    
    this.flag= !this.flag;
    if (this.flag) {
      myTimer.unsubscribe();
    }

   // Observable.timer(0, 2000).takeUntil(true)
    

  }
  
  today: number = Date.now();


}
