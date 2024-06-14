import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  register(registerForm: NgForm){
    this.userService.register(registerForm.value).subscribe(
      (resp) => {
        console.log(resp)
        this.router.navigate(['/login'])
      },
      (err) =>{
        console.log(err);
      }
    );
  }


}
