import { Component,OnInit } from '@angular/core';
import {MoviesService} from './movies.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isSearching:boolean;
  searchValue:string;
  activatedSub:Subscription
  constructor(private moviesService:MoviesService){
    this.isSearching = false;
    this.searchValue = "";
  }

  ngOnInit(){
    this.activatedSub = this.moviesService.isSearching.subscribe(
      searchData =>{
      const {isSearching,value} = searchData;
      this.isSearching = isSearching;
      this.searchValue = value;
     }
   )
  }

  ngOnDestroy():void{
    this.activatedSub.unsubscribe();
    console.log("ngOnDestroy in AppComponent");
  }


}
