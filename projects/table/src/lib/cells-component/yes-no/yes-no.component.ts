import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TableService} from "../../table.service";

@Component({
  selector: 'app-yes-nox',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss']
})
export class YesNoComponent implements OnInit, OnChanges {
  @Input() valid: boolean;
  @Input() displayNo: boolean = false;
  @Input() displayYes: boolean = true;
  @Input() size;
  public icon: string;
  public css: any = {};

  constructor(private service: TableService) {
  }

  ngOnInit(): void {
    this.css.maxWidth = String((this.size || 40)) + 'px';
    this.css.maxHeight = String((this.size || 40)) + 'px';
    const params = this.service.settingConfig.yesNo; /*{
            "true": "/assets/icons/status/actif.png",
            "false": "/assets/icons/status/incatif.png"
        }*/

    if (this.valid && this.displayYes) {
      this.icon = params["true"]
    } else if (this.displayNo) {
      this.icon = params["false"]
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

}
