import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
