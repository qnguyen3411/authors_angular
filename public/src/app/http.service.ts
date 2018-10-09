import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){}

  getAuthors() {
    return this._http.get('/authors')
  }

  getAuthor(id) {
    return this._http.get(`/authors/${id}`)
  }

  createAuthor(data) {
    return this._http.post('/authors', data)
  }

  updateAuthor(id, data) {
    return  this._http.put(`/authors/${id}`, data)
  }

  deleteAuthor(id) {
    return this._http.delete(`authors/${id}`)
  }
}
