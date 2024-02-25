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
      this.http.get<T>("/api/" + path.join("/"))
    );
  }

  postApi<T>(body: any, ...path: string[]) {
    return firstValueFrom(
      this.http.post<T>("http://localhost:3000/" + path.join("/"), body)
    );
  }
  getApi<T>(options: any, ...path: string[]) {
    return firstValueFrom(
      this.http.get<T>("http://localhost:3000/" + path.join("/"), options)
    );
  }
}
