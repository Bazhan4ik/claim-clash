import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  constructor(
    private service: MainService,
  ) { };

  #claimsSource = new BehaviorSubject<any>([]);
  claims$ = this.#claimsSource.asObservable();

  async getClaims(topicId: string) {
    

    console.log("get claims", this.#claimsSource.getValue());

    if (!this.#claimsSource.getValue() || this.#claimsSource.getValue().length == 0) {
      console.log("fetched");
      await this.fetchClaims(topicId);
    }

    return this.claims$;
  }

  async fetchClaims(topicId: string) {
    const claims = await this.service.get<any>("claims", topicId);
    this.#claimsSource.next(claims);
  }

  async addClaim(claim: any, topicId: string): Promise<boolean> {

    const result = await this.service.postApi<any>(claim, "claims", topicId);

    if (!result.accepted) {
      return false;
    }

    const currentClaims = this.#claimsSource.getValue();
    this.#claimsSource.next([...currentClaims, claim]);

    return true;
  }
}
