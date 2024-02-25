import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { MainService } from 'src/services/main/main.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss'],
})
export class ClaimComponent implements OnInit {
  constructor(
    private service: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) { };


  claim: any;
  user: boolean = false;


  async approve() {
    const result = await this.service.postApi<{ approved: boolean }>({}, "topics", this.route.snapshot.paramMap.get("topic-id")!, "claims", this.route.snapshot.paramMap.get("claim-id")!, "approve");

    if (result.approved) {
      this.router.navigate([""])
    }
  }



  async ngOnInit() {
    this.user = await this.auth.authenticated();

    const claimId = this.route.snapshot.paramMap.get("claim-id");
    const topicId = this.route.snapshot.parent?.parent?.paramMap.get("topic-id");

    const result = await this.service.get("topics", topicId!, "claims", claimId!);

    this.claim = result;

    console.log(result);
  }
}