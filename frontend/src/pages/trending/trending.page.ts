import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {

  constructor(
    private service: MainService
  ) { };

  topics!: Topic[];

  async ngOnInit() {
    const result = await this.service.get<Topic[]>("topics");


    if (result && result.length > 0) {
      this.topics = result;
    }
  }
}


interface Topic {
  title: string;
  id: string;
  _id: string;
}