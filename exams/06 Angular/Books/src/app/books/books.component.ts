import { Component, OnInit,Input,OnChanges,SimpleChanges } from '@angular/core';
import {BooksService} from '../books.service'
interface Ibooks{
  title:string;
  authors:string[];
  previewLink:string;
  publisher:string;
  publishedDate:string;
  description:string;
  smallThumbnail:string;
  bookDetails:boolean
}



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit,OnChanges {

  @Input() searchValue:string;
  startIndex:number;
  books:Ibooks[];
  hasResults:boolean;
  isLoadMore:boolean;
  bookDetails:Ibooks;
  constructor(private booksService:BooksService) {
    this.startIndex = 0;
    this.books = [];
    this.hasResults = false;
    this.bookDetails=null;
   }

  ngOnInit() {
  }

  ngOnChanges(channges:SimpleChanges){
    this.init();
  }

  async init(){
    this.hasResults = false;
    this.startIndex = 0;
    this.books = await this.getBooks();
    this.hasResults = true;
    this.isLoadMore = await this.isLoadingMore();
  }

  async getBooks(){
    
    return await this.booksService.getBooks(this.searchValue,this.startIndex);
  }

  async loadMore(){
    this.startIndex += 10;
    const newBooks:Ibooks[] = await this.getBooks();
    this.books = this.booksService.concatArr(this.books,newBooks);
    this.isLoadMore = await this.isLoadingMore();
  }

  async isLoadingMore(){
    
   const books:Ibooks[] = await this.booksService.getBooks(this.searchValue,this.startIndex + 10);
   return books.length > 0;
  }



  showDetails(index){
   this.books =  this.booksService.getBooksDetails(index,this.books);
  }

}
