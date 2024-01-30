import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-claim',
  templateUrl: './write-claim.page.html',
  styleUrls: ['./write-claim.page.scss'],
})
export class WriteClaimPage  implements OnInit {
  constructor() { }

  form!: FormGroup;
  

  submit() {
    console.log(this.form.value);
  }

  ngOnInit() {

    this.form = new FormGroup({
      explanation: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });

  }

}
