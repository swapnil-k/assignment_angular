import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TestImageService } from './test-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imageUrl: any;
  constructor(private _testImage: TestImageService){}
  ngOnInit(): void {
    this.getCatOfTheHour()
  }
  getCatOfTheHour(){
    this._testImage.getCatOfTheHour().subscribe(res =>{
      console.log('data recieved' , res)
      this.imageUrl = environment.cloudFrontUrl + res.image
    })
  }
}
