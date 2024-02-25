import { Injectable } from '@angular/core';
import { MainService } from './main/main.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private service: MainService,
    private cookieService: CookieService,
  ) { };

  initialised: boolean = false;
  token!: string;
  user!: {
    _id: string;
  }


  async register(email: string, password: string) {
    const result = await this.service.postApi<any>({ email, password }, "users/register");


    return result as { token: string; success: boolean; message: string; code: string; };
  }


  async confirm(token: string, code: string) {
    const result = await this.service.postApi<{ user: any; message: string; success: boolean; token: string; code: string; }>({ token, code }, "users/code");


    if (result.success) {
      this.cookieService.set("token", result.token);
      this.user = result.user;
      this.initialised = true;
    }


    return result;
  }


  async authenticated() {
    if (!this.initialised) {
      await this.initialise();
    }
    return !!this.user;
  }

  async initialise() {
    this.initialised = true;

    const token = this.cookieService.get("token");

    if (token) {

      try {
        const result: any = await this.service.getApi<{ user: any; newToken: string; success: boolean; }>({ headers: { "Authorization": token } }, "users/me")
        console.log("USER/ME:", result);
  
        if(result.success) {
          this.user = result.user;
          this.token = result.newToken;
          this.cookieService.set("token", result.newToken);
        }
      } catch (e) {
        console.log("Error in auth service");
        console.log(e);
      }


    }
  }
  
}
 