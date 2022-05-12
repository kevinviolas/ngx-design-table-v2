import {EventEmitter, Inject, Injectable} from '@angular/core';
import {DesignTableInterface} from "./setting/Config.interface";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public config: DesignTableInterface;
  public displayColumn : any;
  public updateHeader : EventEmitter<boolean> = new EventEmitter<boolean>()
  public emptyRow = false;
  constructor(@Inject('__NgxDesignTable__') public settingConfig: any) {
    this.config = settingConfig;
  }

  public setHeader(displayColumn:any) {
    this.displayColumn = displayColumn;
    this.updateHeader.emit(true);
  }
}
