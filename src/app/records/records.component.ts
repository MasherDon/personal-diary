import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { StartTranslateService } from "../starttranslate.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})

export class RecordsComponent {
  date: Date[] = [];
  virtualProducts: any = [];

  // loadCarsLazy(event: LazyLoadEvent) {
  //   // simulate remote connection with a timeout
  //   setTimeout(() => {
  //     //load data of required page
  //     let loadedProducts = this.products.slice(
  //       event.first,
  //       event.first + event.rows
  //     );
  //
  //     //populate page of virtual cars
  //     Array.prototype.splice.apply(this.virtualProducts, [
  //       ...[event.first, event.rows],
  //       ...loadedProducts,
  //     ]);
  //
  //     //trigger change detection
  //     event.forceUpdate();
  //   }, 1000);
  // }

  constructor() {}

  ngOnInit() {

  }
}
