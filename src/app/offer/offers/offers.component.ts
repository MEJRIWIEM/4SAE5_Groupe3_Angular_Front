import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../serviceOffer/offer.service";
import {Offer} from "../../models/offer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  collaboratorsOfferList: Offer[] = [];
 OfferList: Offer[] = [];

  rat!:any;
  public id = this.route.snapshot.paramMap.get('idCollaborator');


  // //= this.route.snapshot.paramMap.get('idCollaborator');
 // public id!: number;
 // public idR!: number;
  starRating = 0;
  errorMressage='';
  form!: FormGroup;
  currentIndex = -1;
  page: number = 1;
  count: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private offerService: OfferService,private fb: FormBuilder) {
  }

ngOnInit(): void {

this.retrieveOffers();
//this.retrieveAllOffer();
  }



  onSubmit(){

    // const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.offerService.create(this.id,this.form.value)
        .subscribe(data => {
              console.log('offer created successfully!');

              //  this.router.navigate(['/advertising']);
              // this.router.navigate(['/advertising', { idCollaborator: this.id }]);
              this.router.navigateByUrl(`/offer/${this.id}`);



            }, (error) => console.log(error)
        )

  }

  // onSubmitRating(){
  //
  //   // const id = Number(this.route.snapshot.paramMap.get('id'));
  //   console.log(this.id);
  //   this.offerService.createRating(this.idR,this.form.value)
  //       .subscribe(data => {
  //             console.log('offer rated successfully!');
  //
  //             //  this.router.navigate(['/advertising']);
  //             // this.router.navigate(['/advertising', { idCollaborator: this.id }]);
  //             //this.router.navigateByUrl(`/offer/${this.id}`);
  //
  //
  //
  //           }, (error) => console.log(error)
  //       )
  //
  // }

  retrieveOffers():void{
    this.id = this.route.snapshot.params['idCollaborator'];
    this.offerService.find(this.id).subscribe(data => {
      this.collaboratorsOfferList = data;

      console.log(this.collaboratorsOfferList);

    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveOffers();
  }

  deleteOffer(id: number) {
    this.offerService.delete(id).subscribe(res => {
      this.collaboratorsOfferList = this.collaboratorsOfferList.filter(item => item.idOffer !== id);
      // this.reloadPage();
      console.log('Post deleted successfully!');


    })
  }


  downloadFile(): void {
    this.offerService.excel().subscribe(response=> {
          console.log(response);
        },
        err=>{this.errorMressage = err.error.message;
        })
    //console.log('excel sent successfully!');

  }
}
