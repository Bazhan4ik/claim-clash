import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient
  ) { }


  get<T>(...path: string[]) {
    return firstValueFrom(
      this.http.get<T>("/api/topics")
    )

  }
}
