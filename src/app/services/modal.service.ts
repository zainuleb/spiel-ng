import { Injectable } from '@angular/core';
import { elementAt } from 'rxjs';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  visible: boolean = false;
  private modals: IModal[] = []

  constructor() { }

  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
  }

  unRegister(id: string) {
    this.modals = this.modals.filter(
      element => element.id !== id
    )
  }

  isModalOpen(id: string): boolean {
    return !!this.modals.find(element => element.id === id)?.visible
  }

  toggleModal(id: string) {
    const modal = this.modals.find(element => element.id === id)
    if (modal) modal.visible = !modal.visible
  }


}
