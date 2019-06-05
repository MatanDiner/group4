import { Component, OnInit,OnDestroy , Input,OnChanges,SimpleChanges} from '@angular/core';
import {MoviesService} from '../movies.service'
import  {Imovie} from '../movie.module'
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit,OnChanges,OnDestroy {
  movies:Imovie[];
  page:number;
  @Input() searchValue:string;
  isLoadMore:boolean;
  isSearchActive:boolean;
  activatedSub : Subscription;
  constructor(private moviesService:MoviesService) {
    this.movies = [];
    this.page = 0; 
    this.searchValue = "";
    this.isLoadMore = false;
   }

  ngOnInit() {

   // this.activatedSub = this.moviesService.searchMoviesActive.subscribe( (searchValue:string)=>{
   // this.page = 0; 
    //this.searchValue = searchValue;
   // this.getSearchData();

  // })
 
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.page = 0; 
    this.getSearchData();
  }  

  async getSearchData(){
    this.movies = await this.getMovies();
    this.isLoadMore = await this.checkLoading();
    this.isSearchActive = true;
  }

  async getMovies(){
   
    return await this.moviesService.getMovies(this.searchValue,this.page);
  }

  async checkLoading(){
    this.movies = await this.moviesService.getMovies(this.searchValue,++this.page);
    return this.movies.length > 0;
  }

  loadMore(){
    this.page += 1 ;
    this.getSearchData();
  }

 
  ngOnDestroy():void{
    //this.activatedSub.unsubscribe();
    console.log("ngOnDestroy in MoviesComponent");
  }

}
