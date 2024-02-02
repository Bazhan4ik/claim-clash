import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
})
export class ClaimsComponent  implements OnInit {
  constructor(
    private service: MainService,
    private route: ActivatedRoute,
  ) { };


  claims!: any[];


  async ngOnInit() {
    const topicId = this.route.snapshot.parent?.parent?.paramMap.get("topic-id");

    const result = await this.service.get<any>("claims", topicId!);

    this.claims = result;
    console.log(result);
  }

}
