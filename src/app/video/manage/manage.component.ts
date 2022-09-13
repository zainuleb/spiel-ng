import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe((params: Params) => {
      let param = params.params;
      this.videoOrder = param.sort == '2' ? param.sort : '1';
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(console.log);
  }

  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.router.navigateByUrl(`/manage?sort=${value}`);
  }
}
