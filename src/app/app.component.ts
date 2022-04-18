import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spiel';
  imgURL = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
  currentDate = new Date();
  cost = '2020'
  temperature = 44.92
  pizza = {
    toppings: ['peperoni', 'mushrooms', 'onions', 'sausage'],
    crust: 'thin',
    size: 'medium'
  }

  blueClass = false
  fontSize = 16


  changeImage(e: KeyboardEvent) {
    this.imgURL = (e.target as HTMLInputElement).value;
  }

  getName() {
    return this.title;
  }

  logImg(event: string) {
    console.log(event)
  }
}
