import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { Component, OnInit, ViewChild } from '@angular/core';
import {flyInOut,visibility,expand} from '../animations/app.animations';
import {FeedbackServiceService}  from '../feedback-service.service';
import { Observable } from 'rxjs';
// import { expand } from 'rxjs/operators';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    '[@expand]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
   
  @ViewChild('fform') feedbackFormDirective;
  
  feedbackForm: FormGroup;
  feedback: Feedback=new Feedback();
  feedbackreturn:Feedback=new Feedback();
  contactType = ContactType;
  visibility;
  observable:Observable<Feedback>;
  expand;
  constructor(private fb: FormBuilder,private feedbackService:FeedbackServiceService) {
  this.createForm();
  }
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  createForm():void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['',  [Validators.required,Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', Validators.required ,Validators.pattern],
      email: ['', [Validators.required,Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  this.feedbackForm.valueChanges
  .subscribe(data =>this.onValueChanged(data)); 
  this.onValueChanged();//reset form 
  }

  ngOnInit() {
  }


  onSubmit() {
    this.visibility="hidden";
    this.feedback.lastname = this.feedbackForm.controls["lastname"].value;
    this.feedback.firstname = this.feedbackForm.controls["firstname"].value;
    this.feedback.email= this.feedbackForm.controls["email"].value;
    this.feedback.message = this.feedbackForm.controls["message"].value;
    
    

    //  this.feedback.lastname = this.feedbackForm.get("firstname").value;
    // this.feedback.lastname = "feie";

    this.feedback=this.feedbackService.submitFeedback(this.feedback);
    console.log(this.feedbackreturn.message);
        
    this.visibility="shown";
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    
     
   
    this.feedbackFormDirective.resetForm();
  }
  
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
