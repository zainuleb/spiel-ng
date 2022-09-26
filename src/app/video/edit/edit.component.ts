import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/modals/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipsService } from 'src/app/services/clips.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() activeClip: IClip | null = null;
  inSubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please Wait! Updating Clip';

  clipID = new FormControl('');
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  editForm = new FormGroup({
    title: this.title,
    id: this.clipID,
  });

  @Output() update = new EventEmitter();

  constructor(private modal: ModalService, private clipService: ClipsService) {}

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) {
      return;
    }

    this.inSubmission = false;
    this.showAlert = false;
    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }

  async submit() {
    if (!this.activeClip) return;

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertColor = 'Please Wait! Updating Clip...';

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong! Try again later';
      return;
    }

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';
  }

  ngOnDestroy(): void {
    this.modal.unRegister('editClip');
  }
}
