import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClaimsService } from 'src/services/claims/claims.service';
import { MainService } from 'src/services/main/main.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
})
export class ClaimsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private claimsService: ClaimsService,
  ) { };

  #subscription: Subscription = new Subscription();
  claims!: any[];


  async ngOnInit() {
    const topicId = this.route.snapshot.parent?.parent?.paramMap.get("topic-id");

    this.#subscription.add(
      (await this.claimsService.getClaims(topicId!)).subscribe(items => {
        console.log(items);
        this.claims = items;
      })
    );
  }
  ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }

}
