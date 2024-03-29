import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TableService} from "../../table.service";
import { TranslateService } from '../../translate.service';

@Component({
  selector: 'app-equipement-status',
  templateUrl: './equipement-status.component.html',
  styleUrls: ['./equipement-status.component.scss']
})
export class EquipementStatusComponent implements OnInit, OnChanges {
  @Input() type: string;
  public icon: string;
  @Input() size: number | string;
  public css: any = {}
  @Input() lang: string;

  status = '';

  // private params: any = {};

  constructor(private changeDetectorRefs: ChangeDetectorRef, private service: TableService, 
    private translate: TranslateService) {
    this.css.maxWidth = String((this.size || 22)) + 'px';
    this.css.maxHeight = String((this.size || 22)) + 'px';
    //this.params = this.service.settingConfig.equipmentStatus;
  }

  ngOnInit(): void {
    this.css.maxWidth = String((this.size || 22)) + 'px';
    this.css.maxHeight = String((this.size || 22)) + 'px';

    const params: any = this.service.settingConfig.equipmentStatus; /*{
      "actif": "/assets/icons/status/actif.png",
      "oui": "/assets/icons/status/actif.png",
      "hs": "/assets/icons/status/HS.png",
      "inactif": "/assets/icons/status/inactif.png",
      "non": "/assets/icons/status/inactif.png",
      "spare": "/assets/icons/status/spare.png",
    }*/
    const clean: string = (this.type || "").toLocaleLowerCase().replace(/[^A-Z0-9]+/ig, "");
    switch (clean) {
      case 'actif':
        this.status = this.translate.translate(this.lang, 'FUNCTIONAL');
      break;
      case 'inactif':
        this.status = this.translate.translate(this.lang, 'KO');
      break;
    }
    if (params[clean]) {
      this.icon = params[clean];
    } else {
      this.icon = params['default'];
    }
    this.changeDetectorRefs.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

}
