import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  taskService: any;

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

  login(): void {
  if (this.form.invalid) {
    console.log('Please provide username and password');
    return;
  }

  const { username, password } = this.form.value;
  if(!username && !password){
    console.log("please give username and")
  }
  this.authService.login(username, password).subscribe(
    response => {
      if (response && response.token) {
        localStorage.setItem('authToken', response.token);
       
        this.router.navigate(['/ToDo']); 
      } else {
        console.error('Unexpected response format', response);
      }
    },
    error => {
      console.error('Login error', error);
    }
  );
}

}





























































// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   form!: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.form = this.formBuilder.group({
//       username: '',
//       password: ''
//     });
//   }

//   login(): void {
//     const username = this.form.get('username')?.value;
//     const password = this.form.get('password')?.value;

//     this.authService.login(username, password).subscribe(response => {
//       if (response.token) {
//         localStorage.setItem('token', response.token);
//         // Navigate to dashboard or another route
//         this.router.navigate(['/dashboard']);
//       }
//     });
//   }

//   submit(): void {
//     let user = this.form.getRawValue();
//     if (user.username === '' || user.password === '') {
//       console.log("Please provide username and password");
//     } else {
//       this.http.post('http://localhost:2000/TODO/user/login', user, {
//         withCredentials: true
//       }).subscribe(
//         (response: any) => {
//           if (response.token) {
//             localStorage.setItem('authToken', response.token);
//             this.router.navigate(['/dashboard']); // Navigate to another route if needed
//           }
//         },
//         (err) => {
//           console.error('Login error:', err);
//         }
//       );
//     }
//   }
// }



// form!:FormGroup

//     constructor(
//       private formBuilder:FormBuilder,
//       private http:HttpClient,
//       private router:Router
//     ){}
//   ngOnInit(): void {
//     this.form=this.formBuilder.group({
//       username:'',
//       password:''
//     })
//   }

//   submit():void{
//     let user = this.form.getRawValue();
//     console.log(user);

//     if (user.username === '' || user.password === '') {
//       console.log("Please give username and password")
//     } 
    
//     else {
      
//       this.http.post('localhost: 2000/TODO/user/login', user, {
//         withCredentials: true
//       }).subscribe(
//         // () => this.router.navigate(['/ToDo']),
//         (err) => {
          
//           console.error('login error:', err);
//         }
//       );
//     }
//   }