import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'date-format',
    templateUrl: './date-format.component.html',
    styleUrls: ['./date-format.component.scss']
})
export class DateFormatComponent implements OnInit, OnChanges {
    @Input() date: string;
    @Input() timezone : string = 'fr'
    public display: string;

    constructor() {
    }

    ngOnInit() {
    }

    run(date:string) {
        if (date) {
            let t: string[] = date.replace(',', '').split(' ');
            return  `<span class="">
                    <span class="hour">${t[0]}</span>
                    <!--<span class="minute">${t[1]}</span>-->
                </span>`;
        } else {
            return `<span class="time-badge">
                    <span class="hour">-</span>
                    <span class="minute"></span>
                </span>`;
        }
    }

    ngOnChanges(changes: SimpleChanges) {

    }

}
