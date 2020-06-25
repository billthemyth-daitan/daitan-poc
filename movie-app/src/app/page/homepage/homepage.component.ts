import { Component } from '@angular/core';
import { CmsService } from 'src/app/service/cms/cms.service';
import { MoviedbService } from 'src/app/service/moviedb/moviedb.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  title;
  searchLabel;
  loadingLabel = "Loading ..."
  page = { name: 'homepage' }
  movies: any[];
  constructor(private cmsService: CmsService, private movieDbService: MoviedbService) {
    this.updateContent();
  }

  updateContent() {
    this.updateTitle();
    this.updateSearchLabel();
  }

  updateTitle() {
    this.cmsService.get(this.page['name'], 'title').subscribe((response) => {
      this.title = response;
    })
  }

  updateSearchLabel() {
    this.cmsService.get(this.page['name'], 'searchLabel').subscribe((response) => {
      this.searchLabel = response;
    })
  }

  searchMovie(query) {
    console.log(query);
    if (!query) {
      return
    }
    this.movieDbService.searchMovie(query).subscribe((response: any) => {
      console.log(response);
      this.movies = [...response.response.results]
    });

    console.log(this.movies);

  }

}
