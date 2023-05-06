import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.less'],
})
export class ContactUsPage implements OnInit {
  public contactForm: FormGroup = {} as FormGroup;
  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      description: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
    });
  }

  public onSubmit() {
    console.log(this.contactForm.value);
  }
}
