import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimsService } from 'src/services/claims/claims.service';
import { MainService } from 'src/services/main/main.service';

@Component({
  selector: 'app-write-claim',
  templateUrl: './write-claim.component.html',
  styleUrls: ['./write-claim.component.scss'],
})
export class WriteClaimComponent  implements OnInit {
  constructor(
    private service: ClaimsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { };

  form!: FormGroup;
  

  async submit() {
    console.log(this.form.value);

    const result = await this.service.addClaim(this.form.value, this.route.snapshot.parent?.parent?.paramMap.get("topic-id")!);

    if (result) {
      this.router.navigate(["topic", this.route.snapshot.parent?.parent?.paramMap.get("topic-id"), "claims"]);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      explanation: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });
  }

}
