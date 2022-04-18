import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  visible: boolean = false;

  constructor() { }

  isModalOpen(): boolean {
    return this.visible;
  }

  toggleModal() {
    this.visible = !this.visible;
  }
}
