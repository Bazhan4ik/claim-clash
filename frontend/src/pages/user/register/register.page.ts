import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { };

  errorMessage!: string;
  form: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });


  ngOnInit() {}



  async submit() {
    console.log(this.form.value);


    const { code, message, token } = await this.auth.register(this.form.value.email, this.form.value.password);

    if (code != "success") {
      console.log(message);
      this.errorMessage = message;

      if (code == "email_not_confirmed") {
        this.router.navigate(["user", "code"], { queryParams: { token: token } });
      } else if (code == "email_registered") {
        this.router.navigate(["user", "login"]);
      }
      
      return;
    }

    console.log(token);


    this.router.navigate(["user", "code"], { queryParams: { wtf: "what", token } });

  }
}
