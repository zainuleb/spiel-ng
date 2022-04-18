import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  @Input() postImg = "";
  @Output() imageSelected = new EventEmitter<string>();

  constructor() {
    console.log('Cons', this.postImg)
  }

  ngOnInit(): void {
    console.log('Init', this.postImg)
  }

}