import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-sub-content',
  templateUrl: './admin-sub-content.component.html',
  styleUrls: ['./admin-sub-content.component.scss']
})
export class AdminSubContentComponent implements OnInit {


  @Output()
  createPress: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
