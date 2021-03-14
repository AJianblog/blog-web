import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  @Output()
  clickPress: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

}
