import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.css']
})
export class StatusIconComponent implements OnInit {
  @Input() label: string;
  
  src: string;

  constructor() { }

  ngOnInit(): void {
    switch (this.label.toLocaleLowerCase()) {
      case 'closed':
      case 'cloturé':
        this.src = '/assets/icons/status/green-dot.svg'
      break;
      default: 
        this.src = '/assets/icons/status/yellow-dot.svg';
      break;
    }
  }

}
