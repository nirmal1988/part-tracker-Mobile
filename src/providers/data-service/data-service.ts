import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataServiceProvider {
partUrl: string = "http://win10dv31190.cloudapp.net:3000/";// "http://localhost:3000/getpart/";

  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }

  getPart(partId: string){
    return new Promise(resolve => {
      this.http.get(this.partUrl + "getpart/"+ partId)
        .map(res => res.json())
        .subscribe(data => {          
          resolve(data);
        });
    });
  }

}
