import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdsService} from "../serviceAds/ads.service";
import {Adver} from "../../models/adver";

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {

  collaboratorsAdsList: Adver[] = [];


  // public id? = this.route.snapshot.paramMap.get('idCollaborator');
  public id: any;
  currentIndex = -1;
  page: number = 1;
  count: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adsService: AdsService) { }

  ngOnInit(): void {

    this.retrieveAds();


   }


  retrieveAds():void{
    this.id = this.route.snapshot.params['idCollaborator'];
    this.adsService.find(this.id).subscribe(data => {
      this.collaboratorsAdsList = data;
      console.log(this.collaboratorsAdsList);

    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveAds();
  }

  deleteAdvertising(id:number){
    this.adsService.delete(id).subscribe(res => {
      this.collaboratorsAdsList = this.collaboratorsAdsList.filter(item => item.idAd !== id);
      // this.reloadPage();
      console.log('ads deleted successfully!');


    })
  }
  reloadPage(): void {
    window.location.reload();
  }



}
