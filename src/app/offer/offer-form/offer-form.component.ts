import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../serviceOffer/offer.service";

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {
  form!: FormGroup;
  public id = this.route.snapshot.paramMap.get('idCollaborator');
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private offerService: OfferService) {}


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: [],
      name: new FormControl('', [Validators.required]),
      typeOffer: new FormControl('', [Validators.required]),
      percent: new FormControl('', [Validators.required]),


       // rating: ['', Validators.required],

    });
  }

  get f(){
    return this.form.controls;
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



            }, (error) => console.log('error')
        )

  }

}

