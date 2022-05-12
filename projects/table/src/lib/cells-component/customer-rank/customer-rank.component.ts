import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TableService} from "../../table.service";

@Component({
  selector: 'app-customer-rank',
  templateUrl: './customer-rank.component.html',
  styleUrls: ['./customer-rank.component.scss']
})
export class CustomerRankComponent implements OnInit, OnChanges {
  @Input() type: string;
  public typeClass: string;
  private _type: string;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private service: TableService) {
  }

  ngOnInit(): void {
    const config: string[] = this.service.settingConfig.customerRank || ['gold', 'silver', 'bronze', 'default'];
    if (this.type) {
      this._type = (this.type || '').replace(/[^A-Z0-9]+/ig, "");
      for (let c of config) {
        if (this._type.toLocaleLowerCase() === 'default') {
          this.type = 'Classic'.toUpperCase();
          this.typeClass = c.toLocaleLowerCase();
        } else if (this._type.toLocaleLowerCase() === c.toLocaleLowerCase()) {
          this.typeClass = c.toLocaleLowerCase();
          this.type = this.type.toUpperCase();
        }
      }
    } else {
      this.type = 'Classic'.toUpperCase();
      this.typeClass = 'default';
    }


    /*  if (this._type.toLocaleLowerCase() === 'gold') {
        this.typeClass = 'gold'
        this.type = this.type.toUpperCase()
      } else if (this._type.toLocaleLowerCase() === 'silver') {
        this.typeClass = 'silver'
        this.type = this.type.toUpperCase()
      } else if (this._type.toLocaleLowerCase() === 'bronze') {
        this.typeClass = 'bronze'
        this.type = this.type.toUpperCase()
      } else {
        this.type = 'Classic'.toUpperCase();
        this.typeClass = 'default'
      }
      this.changeDetectorRefs.detectChanges();*/
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }
}
