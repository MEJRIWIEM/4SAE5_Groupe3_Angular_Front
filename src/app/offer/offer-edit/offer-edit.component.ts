import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../serviceOffer/offer.service";
import {Offer} from "../../models/offer";

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  idCollaborator!: number;
  offer!: Offer;


  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private offerService: OfferService) {}

  ngOnInit(): void {
    this.idCollaborator = this.route.snapshot.params['idCollaborator'];

    this.id = this.route.snapshot.params['idOffer'];
    this.offerService.findById(this.id).subscribe((data: Offer)=>{
      this.offer = data;
    });

    this.form = this.formBuilder.group({
      id: [],
      name: new FormControl('', [Validators.required]),
      typeOffer: new FormControl('', [Validators.required]),
      percent: new FormControl('', [Validators.required]),
    });
  }



  get f(){
    return this.form.controls;
  }

  onSubmit(){
    // this.idCollaborator = this.route.snapshot.params['idCollaborator'];
    // console.log(this.idCollaborator);



    console.log(this.form.value);
    this.offerService.update(this.id, this.form.value).subscribe(res => {
      console.log('Offer updated successfully!');
      this.router.navigateByUrl(`/offer/${this.idCollaborator}`);
    })
  }

}
