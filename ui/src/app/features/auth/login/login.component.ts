import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const {email, password} = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/admin']);
          } else {
            this.snackBar.open('Email ou mot de passe incorrect', 'Fermer', {
              duration: 3000
            });
          }
        },
        error: (error) => {
          console.error('Erreur lors de la connexion:', error); // Log propre de l'erreur
          this.snackBar.open(
            'Une erreur est survenue. Veuillez réessayer.',
            'Fermer',
            {
              duration: 3000
            }
          );
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
