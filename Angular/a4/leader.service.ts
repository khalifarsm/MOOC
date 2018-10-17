import { Injectable } from '@angular/core';
import {LEADERS,leader} from './shared/leader';
import { of,Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  

  constructor(private restangular: Restangular) { }

 


  getleaders():Observable <leader[]>{
  // {return of(LEADERS).pipe(delay(2000));
    return this.restangular.all('leaders').getList();
    
  }
  
  
  getFeaturedLeader():Observable <leader> {
    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    return this.restangular.all('Leader').getList({featured: true})
    .map(Promotion => LEADERS[0]);
  }
  getLeader(id:number):Observable <leader> {
    // return of(LEADERS.filter((leader) => leader.id=== id)[0]).pipe(delay(2000));
    return  this.restangular.one('leaders', id).get();
  };
}
