import { Injectable } from '@angular/core';
import {Promotion } from '../shared/promotion';
import {PROMOTIONS } from '../shared/promotions';
import { of, pipe,Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {


  
  constructor(private restangular: Restangular) { }

 
  getPromotions():Observable <Promotion[]>{
    return this.restangular.all('promotions').getList();
    // return of(PROMOTIONS).pipe(delay(2000));
  }

 

  getPromotion(id:number):Observable <Promotion> {
    // return of(PROMOTIONS.filter((promo) => (promo.id=== id))[0]).pipe(delay(2000));
    return  this.restangular.one('dishes', id).get();
  }

  getFeaturedPromotion():Observable <Promotion> {
    // return of(PROMOTIONS.filter((promo) => (promo.featured))[0]).pipe(delay(2000));
    return this.restangular.all('Promotion').getList({featured: true})
    .map(Promotion => PROMOTIONS[0]);
  }
  
}
