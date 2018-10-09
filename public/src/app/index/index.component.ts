import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  authors: Array<Object> = []
  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.fetchAuthors();
  }

  fetchAuthors() {
    this._httpService.getAuthors().subscribe(response => {
      if (response['status'] == "success") {
        this.authors = response['data'] as Array<Object>;
      }
    })
  }

  deleteAuthor(id) {
    this._httpService.deleteAuthor(id).subscribe(response => {
      this.fetchAuthors()
    })
  }

}
