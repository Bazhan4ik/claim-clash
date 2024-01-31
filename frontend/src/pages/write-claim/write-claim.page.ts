import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-write-claim',
  templateUrl: './write-claim.page.html',
  styleUrls: ['./write-claim.page.scss'],
})
export class WriteClaimPage  implements OnInit {
  constructor(
    private service: MainService,
    private route: ActivatedRoute,
  ) { }

  form!: FormGroup;
  

  async submit() {
    console.log(this.form.value);

    const result = await this.service.postApi(this.form.value, "claims", this.route.snapshot.paramMap.get("topic-id")!);

    console.log(result);
  }

  ngOnInit() {

    this.form = new FormGroup({
      explanation: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });

  }

}
