import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TableService} from "../../table.service";

@Component({
    selector: 'icon-origin',
    templateUrl: './origin.component.html',
    styleUrls: ['./origin.component.scss']
})
export class OriginComponent implements OnInit, OnChanges  {
    @Input() icon: string;
    public iconSrc: string;

    constructor(public service: TableService) {
    }

    ngOnInit(): void {
        const list = this.service.settingConfig.origin /*[{
            "label": "Web",
            "data": "assets/icons/nowteam/Web.png"
        }, {
            "label": "PRTG",
            "data": "assets/icons/nowteam/PRTG.png"
        }, {
            "label": "Mail",
            "data": "assets/icons/nowteam/Mail.png"
        }, {
            "label": "Téléphone",
            "data": "assets/icons/nowteam/Telephone.png"
        }, {
            "label": "Bot",
            "data": "assets/icons/nowteam/Bot.png"
        }];*/
        const flter = list.filter((e: any) => {
            return this.icon.includes(e.label);
        });
        this.iconSrc = flter && flter.length && flter[0].data ? flter[0].data : '';
    }

    ngOnChanges(changes: SimpleChanges) {
        this.ngOnInit();
    }

}
