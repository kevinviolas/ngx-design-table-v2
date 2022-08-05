import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'double-line',
  templateUrl: './double-line.component.html',
  styleUrls: ['./double-line.component.css']
})
export class DoubleLineComponent implements OnInit {
  @Input() line1: string = '';
  @Input() line2: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
