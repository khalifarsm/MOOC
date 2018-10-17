import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import {Feedback} from './shared/Feedback'
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {
  feedbackreturn: Feedback;
public observable: Observable<Feedback>;
  constructor(private restangular: Restangular) {
    
  }

  submitFeedback(feedback: Feedback ): Feedback {
   
    this.restangular.all('feedback')
    .post(feedback)
    .subscribe(feedback=>this.feedbackreturn);
    return this.feedbackreturn;
    }
 
}
