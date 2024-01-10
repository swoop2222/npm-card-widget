import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MyCardWidgetComponent } from "my-card-widget"
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MyCardWidgetComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  parentKeyValuePair = {
    APIKey: 'H90OJlGD8GJJ',
    Token: '',
    Culture: 'es',
    Amount: '10',
    ProductDetails: 'Iphone',
    IsSale: true,
    ServiceNumber: '450394233',
    TerminalID: '112375001',
    Itbms: '1.2',
    keys:{
      key1:'010001',
      key2:'B0DC0DDE52DF2CB4C2B4E35FF1E1F6AF8F15B8F493828EEB3B5EC158FCC33D2753347C4D8523CEBB03F8DAE3F83C225BBC562CDD0518B804757A48EB07DBEE03A94901972A511636CE33339C98A4DBB18BEB4FEA5D6F8D1019624C257CAB3D804CF3C0F3E899AC7A6B1F511FC627A0E4A596C7369D29D2AF7E4D2A964F84B76B'
    }
  };
  title = 'demoapp';
  constructor() {
    
  }
  ngOnInit() {
  
  }
  
}
