import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import IClip from 'src/app/modals/clip.model';
import { ClipsService } from 'src/app/services/clips.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  clips: IClip[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipService: ClipsService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      let param = params.params;
      this.videoOrder = param.sort == '2' ? param.sort : '1';
    });

    this.clipService.getUserClips().subscribe((docs) => {
      this.clips = [];
      docs.forEach((doc) => {
        this.clips.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.router.navigateByUrl(`/manage?sort=${value}`);
  }

  openModal($event: Event, clip: IClip) {
    $event.preventDefault();
    this.modal.toggleModal('editClip');
  }
}
