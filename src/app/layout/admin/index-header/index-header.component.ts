import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-index-header',
  templateUrl: './index-header.component.html',
  styleUrls: ['./index-header.component.scss']
})
export class IndexHeaderComponent implements OnInit {

  @Output()
  menuPress: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

}
