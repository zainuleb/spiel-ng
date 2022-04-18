import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() modalId: string = ''

  constructor(public modal: ModalService) { }

  ngOnInit(): void {
    console.log(this.modal.visible);
  }

  closeModal() {
    this.modal.toggleModal(this.modalId)
  }

}
