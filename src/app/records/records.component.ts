import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PageTranslateService } from "../pageTranslate.service";
import { RecordsService } from "../records.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [RecordsService]
})

export class RecordsComponent {
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
