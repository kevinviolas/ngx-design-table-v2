import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-is-mat-icon',
    templateUrl: './is-mat-icon.component.html',
    styleUrls: ['./is-mat-icon.component.scss']
})
export class IsMatIconComponent implements OnInit, OnChanges {
    @Input() input: string;
    public display: string;
    public isIcon : boolean = false;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.ngOnInit();
      }

    ngOnInit(): void {
        if (this.input && this.input.indexOf(('icon.')) > -1){
            this.isIcon = true;
            this.display = this.input.split('.')[1];
        } else {
            this.isIcon = false;
            this.display = this.input;
        }
    }

}
