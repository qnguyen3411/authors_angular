import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  authorToEdit = {"name": ""}
  authorId = ""
  error = ""
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
){}
  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._httpService.getAuthor(params['id'])
      .subscribe(response => {
        if (response['status'] == "success") {
          this.authorToEdit['name'] = response['data']['name']
          this.authorId = response['data']['_id']
        } 
      })
    });
  }

  editAuthor() {
    this._httpService.updateAuthor(this.authorId, this.authorToEdit)
      .subscribe(response => {
        if (response['status'] == "success") {
          this.authorToEdit['name'] = response['data']['name']
          this.authorId = response['data']['_id']
        } else {
          this.error = response['data']['error']
        }
      })
  }

}
