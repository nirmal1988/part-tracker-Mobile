import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scanData : {};
  partDetails: any;
  
  //options :BarcodeScannerOptions;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private dataServiceProvider: DataServiceProvider ) {
  }   

  scan(){
    // this.options = {
    //     prompt : "Scan your barcode "
    // }
    this.barcodeScanner.scan().then((barcodeData) => {
        console.log(barcodeData);
        this.scanData = barcodeData;

        this.dataServiceProvider.getPart(barcodeData.text)
        .then(p => {
          this.partDetails = p;
          this.partDetails.transactions.forEach(element => {
            if(element.vin !== ""){
              this.partDetails.vin = element.vin;
            }
          });
        });

    }, (err) => {
        console.log("Error occured : " + err);
    });           
  }   
}
