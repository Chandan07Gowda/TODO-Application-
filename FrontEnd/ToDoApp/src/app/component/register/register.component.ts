import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      console.log('Please provide username and password');
      return;
    }

    const { username, password } = this.form.value;

    this.authService.register(username, password).subscribe(
      (response :any) => {
        console.log('Registration successful', response);
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        } else {
          console.error('No token received in response');
        }
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration error', error);
      }
    );
  }
}


































// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'] 
// })
// export class RegisterComponent implements OnInit { 
//   form!: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.form = this.formBuilder.group({
//       username: '', // Added Validators
//       password: '' // Added Validators
//     });
//   }

//   submit(): void {
//     let user = this.form.getRawValue();
//     console.log(user);

//     if (user.username === '' || user.password === '') {
//       console.log("Please give username and password")
//     } 
    
//     else {
      
//       this.http.post('http://localhost:2000/TODO/user/register', user, {
//         withCredentials: true
//       }).subscribe(
//         (response: any) => {
//           if (response.token) {
//             localStorage.setItem('authToken', response.token.token);
//           }
//         },
//         (err) => {
          
//           console.error('Registration error:', err);
//         },
//         () => this.router.navigate(['/']),
       
//       );
//     }
//   }
// }
