import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-registration-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.scss',
})
export class RegistrationForm implements OnInit {
  registrationForm!: FormGroup;

  protected registrationFormData = [
    {
      label: 'User Name',
      key: 'userName',
      type: 'text',
      required: true,
      placeholder: 'Enter your user name',
      errorMessage: 'User name is required',
    },
    {
      label: 'Email',
      key: 'email',
      type: 'email',
      required: true,
      placeholder: 'Enter your email',
      errorMessage: 'Email is required',
    },
    {
      label: 'Password',
      key: 'password',
      type: 'password',
      required: true,
      placeholder: 'Enter your password',
      errorMessage: 'Password is required',
    },
    {
      label: 'Confirm Password',
      key: 'confirmPassword',
      type: 'password',
      required: true,
      placeholder: 'Confirm your password',
      errorMessage: 'Password is required',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-zA-Z0-9]+$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&]{8,}$/)]],
        confirmPassword: [
          '',
          [
            Validators.required,
            this.passwordMatchValidator,
          ],
        ],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
