import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  postData = {"name": ""}
  error = ""
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
){}

  ngOnInit() {
  }

  postNewAuthor() {
    this._httpService.createAuthor(this.postData)
    .subscribe(response => {
      console.log(response);
      if (response['status'] == "success") {
      this._router.navigate(['/'])
      } else {
        this.error = response['data']['error']
        this.postData = {"name": ""}
      }
    })
  }
}
