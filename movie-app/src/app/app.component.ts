import { Component } from '@angular/core';
import { CmsService } from './service/cms/cms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title;
  page = { name: 'app' }
  constructor(private cmsService: CmsService) {
    this.updateContent();
  }

  updateContent() {
    this.updateTitle();
  }

  updateTitle() {
    this.cmsService.get(this.page.name, 'title').subscribe((response) => {
      this.title = response;
    })
  }
}