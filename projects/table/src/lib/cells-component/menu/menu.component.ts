import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

interface IMenuSettings {
  Label: string;
  Icon?: string; 
  IconColor?: string;
  Type: 'link' | 'modal';
  Value: any;
  Data?: any;
  Class?: string;
  Route?: string;
}
@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() menuSettings: IMenuSettings[] = [];
  @Input() element: any;
  @Output() callHandler: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  action(menu: IMenuSettings) {
    if (menu.Data && menu.Data.length > 0 && menu.Type == 'link') {
      let list = [];
      for(const dat of menu.Data) {
        console.log(this.element[dat]);
        list.push(this.element[dat]);
      };
      menu.Data = list;
    } else if (menu.Data && menu.Data.length > 0 && menu.Type == 'modal') {
      let list = [];
      for(const dat of menu.Data) {
        list[dat] = this.element[dat];
      };
      menu.Data = list;
    }
    this.callHandler.emit(menu)
  }
}
