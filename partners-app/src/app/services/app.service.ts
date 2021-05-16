import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  rootURL = '/api';
  params = {
    id: 5,
  }
  constructor(private http: HttpClient) { }

  getPartners(t:string) {
    let m = t;
    return this.http.get(this.rootURL + '/partners',{params: {distance:m}});
  }
}
