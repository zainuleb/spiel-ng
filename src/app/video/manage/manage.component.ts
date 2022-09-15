import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ClipsService } from 'src/app/services/clips.service';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipService: ClipsService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      let param = params.params;
      this.videoOrder = param.sort == '2' ? param.sort : '1';
    });

    this.clipService.getUserClips().subscribe(console.log);
  }

  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.router.navigateByUrl(`/manage?sort=${value}`);
  }
}
