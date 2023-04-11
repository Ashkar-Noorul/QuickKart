import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup
  msg: string;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.feedbackForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      feedback: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  SubmitForm(form: FormGroup) {
    if (this.feedbackForm.valid) {
      this.msg = "Feedback successfully submitted";
    }
    else {
      this.msg = "Something went wrong, Try again later";
    }
  }

}
