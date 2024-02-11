import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/services/main/main.service';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss'],
})
export class FactsComponent  implements OnInit {
  constructor(
    private service: MainService,
    private route: ActivatedRoute,
  ) { };


  facts!: any[];



  async ngOnInit() {
    const topicId = this.route.snapshot.parent?.parent?.paramMap.get("topic-id");

    const result = await this.service.get("topics", topicId!, "facts");

    this.facts = result as any;

    console.log(result);
  }
}
