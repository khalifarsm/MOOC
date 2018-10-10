import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[]{
    return LEADERS
  }

  getLeader(id: number): Leader{
    //return DISHES.filter((dish) => (dish.id === id))[0];
    return LEADERS.filter(function(d){
      return d.id == id
    })[0];
  }

  getFeaturedLeader(): Leader {
    //return DISHES.filter((dish) => dish.featured)[0];
    return LEADERS.filter(function(leader){
      return leader.featured;
    })[0]
  }
}
