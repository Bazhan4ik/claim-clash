import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/services/main/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit {
  constructor(
    private service: MainService,
  ) { };


  topics!: any[];


  async ngOnInit() {
    const result = await this.service.get("topics");
    console.log(result);

    this.topics = result as any;
  };
}
