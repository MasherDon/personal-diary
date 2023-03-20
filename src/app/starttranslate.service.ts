import { Injectable } from '@angular/core';
import { MenuItem, PrimeNGConfig } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class StartTranslateService {
  constructor(private config: PrimeNGConfig, private translateService: TranslateService) {}

}
