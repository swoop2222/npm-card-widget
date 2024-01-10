import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMaskModule } from 'angular-imask';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

declare function base64encode(stringValue: any): string;
declare function encryptedString(key: any, s: any): string;
declare function initializeKey(exponent: any, modulus: any): any;

import * as cardValidator from "card-validator";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'lib-my-card-widget',
  standalone: true,
  imports: [CommonModule, IMaskModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./my-card-widget.component.html",
  styleUrls: ["./my-card-widget.component.css"]
})
export class MyCardWidgetComponent {
  @Input() keyValueParameters!: { [key: string]: any; };
  callValues: any;
  showForm: boolean = false;

  encryptedString!: string
  list!: string
  secondList:any;
  keyValue!: string

  cardNumber!: string;
  cvv!: string;
  validityDate!: string;
  name!: string;

  key1 = "010001";
  key2 = "B0DC0DDE52DF2CB4C2B4E35FF1E1F6AF8F15B8F493828EEB3B5EC158FCC33D2753347C4D8523CEBB03F8DAE3F83C225BBC562CDD0518B804757A48EB07DBEE03A94901972A511636CE33339C98A4DBB18BEB4FEA5D6F8D1019624C257CAB3D804CF3C0F3E899AC7A6B1F511FC627A0E4A596C7369D29D2AF7E4D2A964F84B76B"
  public flipped!: boolean;
  public cvvShow!: boolean;
  public  amountCheck!:boolean;

  public month: any | 'any';
  public year: any | 'any';
  public valid: any | 'any';
  public maxLength!: number;
  public maxCvvLength!: number;
  public maxExpYear!: number;
  public validationRes: any;
  public imask = { mask: '0000********0000' };

  cardForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,) {


    this.cardForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(19)]],
      validityDate: ['', [Validators.required, Validators.minLength(5),]],
      cvv: [null]
    });

    this.maxLength = 255;

  }

  makeAPICall() {
    const apiUrl = 'http://localhost:16407/api/UIComponentApi/GetCreditCard';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const data = this.callValues;
    debugger

    if (data.APIKey != null) {
      this.http.post(apiUrl, data, { headers, responseType: 'text' })
        .subscribe((response) => {
          console.log(response);
          this.showForm = true;
          debugger
          this.list = JSON.parse(response);
          this.patchValues(this.list);

        }, (error) => {
          console.error(error);
        });
    }
  }

  makeSecondAPICall() {
    debugger
    const apiUrl = 'http://localhost:16407/api/UIComponentApi/CreditCard';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.innitKey(this.list);
    const queryString = `?request=${encodeURIComponent(this.encryptedString)}`;
    const fullUrl = apiUrl + queryString;
    this.http.post(fullUrl, null, { headers, responseType: 'text' })
      .subscribe((response) => {
        console.log(response);
        this.secondList=JSON.parse(response);
        debugger;
      }, (error) => {
        console.error(error);
      });
  }
  encoding() {
    return this.cardForm.value.cardNumber + "\\" +
      this.cardForm.value.name + "\\" +
      this.cardForm.value.validityDate.substring(0, 2) + "\\" +
      this.cardForm.value.validityDate.substring(3) + "\\" +
      this.callValues.Token + "\\" +
      this.callValues.AccountNumber + "\\" +
      this.callValues.APIKey + "\\" +
      this.callValues.Culture + "\\" +
      this.callValues.CVV + "\\" +
      this.callValues.IsSale + "\\" +
      this.callValues.Amount + "\\" +
      this.callValues.ProductDetails + "\\" +
      this.callValues.ServiceNo + "\\" +
      this.callValues.TerminalID + "\\" +
      this.callValues.Itbms
  }

  innitKey(list: any) {
    var encode = this.encoding();
    var key = initializeKey(this.key1, this.key2);
    this.encryptedString = encryptedString(key,
      encode
    )
  }
  patchValues(list: any) {
    this.cardNumber = list.ResponseData.Number
    this.name = list.ResponseData.CardHolderName
    this.validityDate = list.ResponseData._ExpiryDate
    this.cvvShow=list.ResponseData.IsSale
    if(list.ResponseData.Amount>0)
    {
      this.amountCheck=true;
    }
    else{
      this.amountCheck=false;
    }
  }
  ngOnInit() {
    this.maxLength = 255;
    this.maxExpYear = 25;
    this.callValues = this.keyValueParameters
  }
  onFocusCVV() {
    this.flipped = true;
  }
  onBlurCVV() {
    this.flipped = false;
  }
  validateDate() {
    this.valid = cardValidator.expirationDate(this.validityDate, this.maxExpYear).isValid;
    return this.valid
  }
  validateNumber() {
    this.valid = cardValidator.number(this.cardNumber).isValid;
    return this.valid
  }
  validate() {
    debugger
    this.cardNumber.valueOf();
    this.validationRes = cardValidator.number(this.cardNumber);
    console.log(this.validationRes);
    if (this.validationRes.card) {
      this.maxLength = this.validationRes.card?.lengths?.pop() + this.validationRes.card?.gaps.length;
      this.maxCvvLength = this.validationRes.card?.code.size;
      let maskArray = new Array(this.maxLength).fill('0');
      this.validationRes.card?.gaps.reverse().forEach((gap: number) => { maskArray.splice(gap, 0, ' '); })
      this.imask = { mask: maskArray.join('') }
    } else {
      this.maxLength = 255;
    }
  }

  getIssuerIcon() {
    return `https://cdn.flnf.hu/assets/${this.validationRes.card.type}.svg`
  }
  bindNumber(event: any) {
    this.cardNumber = event.target.value;
  }
  bindName(event: any) {
    this.name = event.target.value;
  }
  bindDate(event: any) {
    this.validityDate = event.target.value;
  }
  bindCvv(event: any) {
    this.cvv = event.target.value;
  }


}
