import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TableService} from "../../table.service";

@Component({
  selector: 'app-equipement-type',
  templateUrl: './equipement-type.component.html',
  styleUrls: ['./equipement-type.component.scss']
})
export class EquipementTypeComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() type: string;
  @Input() size: number | string;
  public icon: string;
  public css: any = {}

  constructor(private changeDetectorRefs: ChangeDetectorRef, private service: TableService) {
    this.css.maxWidth = String((this.size || 40)) + 'px';
    this.css.maxHeight = String((this.size || 40)) + 'px';
  }

  ngOnInit(): void {
    this.css.maxWidth = String((this.size || 40)) + 'px';
    this.css.maxHeight = String((this.size || 40)) + 'px';
    const params: any = this.service.settingConfig.equipmentType; /*{
            "firewall": "/assets/icons/equipment/firewallnwt.png",
            "nas": "/assets/icons/equipment/nasnwt.png",
            "pcfixe": "/assets/icons/equipment/pcfixe_1.png",
            "pcportable": "/assets/icons/equipment/pcportable_1.png",
            "portable": "/assets/icons/equipment/pcportable_1.png",
            "clientleger": "/assets/icons/equipment/pcportable_1.png",
            "clientléger": "/assets/icons/equipment/pcportable_1.png",
            "onduleur": "/assets/icons/equipment/ondulateur.png",
            "serveur": "/assets/icons/equipment/serveur.png",
            "server": "/assets/icons/equipment/serveur.png",
            "servervirtuel": "/assets/icons/equipment/vps.png",
            "serveurvirtuel": "/assets/icons/equipment/vps.png",
            "vm": "/assets/icons/equipment/vps.png",
            "wifi": "/assets/icons/equipment/wifi.png",
            "workstationfixe": "/assets/icons/equipment/pcfixe_1.png",
            "workstationportable": "/assets/icons/equipment/pcportable_1.png",
            "imprimante": "/assets/icons/equipment/printer.png",
        }*/

    const clean: string = (this.type || "").toLocaleLowerCase().replace(/[^A-Z0-9]+/ig, "");
    const server: boolean = this.name.toLocaleLowerCase().includes('srv');
    if (params[clean]) {
      this.icon = params[clean];
    } else {
      this.icon = params['default'];
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

}
