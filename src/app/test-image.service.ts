import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestImageService {

  constructor(private http: HttpClient) { }

  getCatOfTheHour(){
      return this.http.get<any>(environment.ApiUrl + 'api/get-image')
  }
}
