import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage  implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { };


  currentTab = "facts";
  subscription: Subscription = new Subscription();



  ngOnInit() {
    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentTab = event.url.split("/")[3] || "facts";
        }
      })
    );
  }
}
