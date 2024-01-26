import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  host: { ngSkipHydration: 'true' }
})
export class AppComponent {
  constructor() {}
}
