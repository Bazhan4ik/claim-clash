import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage  implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) { };


  code!: string;
  token!: string;
  errorMessage!: string;


  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token')!;

    if (!this.token) {
      this.router.navigate(["user", "register"]);
      return;
    }
  }



  check() {
    if (this.code.length == 6) {
      this.submit();
    }
  }
  async submit() {
    if (this.code.length != 6) {
      return;
    }

    const result = await this.auth.confirm(this.token, this.code)

    if (result.success) {
      this.router.navigate([""]);
      return;
    }

    this.errorMessage = result.message;
    

  }


}
