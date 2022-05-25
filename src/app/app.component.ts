import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

interface XYZ {
  message?: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {


  public title = "Hello";
  public xyz : XYZ= {};
  public str : string  | undefined;

  constructor(private service: AppServiceService) {}

  ngOnInit() {
    this.getDataFromApi();
  }

  getDataFromApi() {

    this.service.getData().subscribe((data) => {

      this.xyz = data;

      this.str = this.xyz.message;

      console.log(this.xyz)
      console.log("Response from Api", data)
    })
  }
}
