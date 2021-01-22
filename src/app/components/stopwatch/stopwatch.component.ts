import { Component} from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent  {
  
  flagStartStop:boolean  = true;
  flagWait:boolean = false;
  mainTimer:any;
  waitTimer:any;
  clickCounter:number = 0
  counterSec:number=0;
  counterMin:number=0;
  counterHour: number=0;


  constructor(private timerService:TimerService) { }
 
  
  start ():void {
   
    if (this.flagStartStop) {
     
      this.mainTimer = this.timerService.getTimer(1000).
            subscribe (data  => {
              this.counterSec++;
              if (this.counterSec > 59) { this.counterMin++; this.counterSec =0};
              if (this.counterMin > 59) { this.counterHour++; this.counterMin =0};
              if (this.counterHour > 24) { this.reset()};
              
            });
      
    }
    this.flagStartStop= !this.flagStartStop;

    if (this.flagStartStop) {
      this.mainTimer.unsubscribe();
      this.reset();
    }
  }

  reset():void {
    this.counterSec = this.counterMin = this.counterHour  = 0;
  }


  // если бы не условие задания, по которому задано  не более 300мс для двойного клика
    // проще было бы использовать ссобытие dbclick
  wait():void {   

    this.clickCounter++;
    if (this.clickCounter==1) {
        this.waitTimer = this.timerService.getTimer(1).
                subscribe (data  => {
                                    
                  if (data>0 && data<300 && this.clickCounter >=2) {
                    console.log('количество кликов', this.clickCounter);
                    if (this.mainTimer) {
                      this.mainTimer.unsubscribe();
                      this.flagStartStop = true;
                    }
                    
                    this.waitTimer.unsubscribe();
                    this.clickCounter = 0;
                                           
                  }

                  if (data>300)  {
                    this.waitTimer.unsubscribe();
                    this.clickCounter = 0;
                  }
                                  
                });

    }
    
  }
  
}

