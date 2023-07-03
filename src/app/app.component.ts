import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',

  template: `
  <h1>Product Manager</h1>
  <pm-products></pm-products>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product_manager';
}
