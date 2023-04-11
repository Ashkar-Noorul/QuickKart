import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  msg: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.minLength(12)]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      dateOfbirth: ['', [Validators.required, checkDate, checkAge]],
      address:['', Validators.required]
    });

  }
  submitForm(form: FormGroup) {

    if (this.registerForm.valid) {
      this.msg = "Signup Successful"
    }
    else {
      this.msg = "Try again later"
    }
  }
  

}
function checkDate(control: FormControl) {
  var currentDate = new Date();
  var givenDate = new Date(control.value)
  console.log(currentDate);
  console.log(givenDate);
  if (givenDate <= currentDate || givenDate == null) {
    return null
  }
  else {
    return {
      dateError: {
        message: "Enter a date less than today's date"
      }
    };
  }
}

function checkAge(control: FormControl) {
  const dob = new Date(control.value);
  const age = new Date().getFullYear() - dob.getFullYear();
  if (age >= 18) {
    return null;
  } else {
    return { ageError: true };
  }
}

//  const dob = control.get('dateOfbirth');
//  if (!dob.value) {
//    return null; // If no dob is provided, return no error
//  }

//  const dobDate = new Date(dob.value);
//  const currentDate = new Date();

//  if (dobDate > currentDate) {
//    return { 'dobInvalid': true }; // If dob is in the future, return an error
//  }

//  const ageDiffMs = currentDate.getTime() - dobDate.getTime();
//  const ageDate = new Date(ageDiffMs);
//  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

//  if (age < 18) {
//    return { 'dobUnderage': true }; // If age is less than 18, return an error
//  }

//  return null; // If dob is valid, return no error
//};
