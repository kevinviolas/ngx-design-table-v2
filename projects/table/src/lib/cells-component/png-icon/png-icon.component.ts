import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'png-icon',
    templateUrl: './png-icon.component.html',
    styleUrls: ['./png-icon.component.scss']
})
export class PngIconComponent implements OnInit {
    @Input() src: string;
    @Input() fontSize = '24px';
    @Input() color: string;
    @ViewChild('icon', {static: true}) icon: ElementRef<HTMLElement>;
    private _padding = '5px 13px';
    private _display = 'inline-flex';
    private _size = 'cover';

    constructor() {
    }

    ngOnInit() {
        if (this.src) {
            this.icon.nativeElement.style.backgroundImage = `url(${this.src})`;
            this.icon.nativeElement.style.backgroundSize = this._size;
            this.icon.nativeElement.style.display = this._display;
            this.icon.nativeElement.style.width = this.fontSize;
            this.icon.nativeElement.style.height = this.fontSize;
            this.icon.nativeElement.style.padding = this._padding;
            if (this.color) {
                this.icon.nativeElement.style.color = this.color;
            }
        }
    }

}
