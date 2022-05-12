import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdsService} from "../serviceAds/ads.service";
import {Adver} from "../../models/adver";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-advertising',
  templateUrl: './edit-advertising.component.html',
  styleUrls: ['./edit-advertising.component.css']
})
export class EditAdvertisingComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  idF!: number;

  ads!: Adver;
  idCollaborator!:number;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private adsService: AdsService) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['idAd'];
    this.adsService.findById(this.id).subscribe((data: Adver)=>{
      this.ads = data;
    });



    this.form = this.formBuilder.group({
      id: [],
      name: new FormControl('', [Validators.required]),
      cost: new FormControl('', Validators.required),
      typeAd: new FormControl('', [Validators.required]),
      targetNbrViews: [null, [Validators.required]],
      finalNbrViews: new FormControl('', [Validators.required]),
    });


  }


  get f(){
    return this.form.controls;
  }

  onSubmit(){
   // this.idCollaborator = this.route.snapshot.params['idCollaborator'];
   // console.log(this.idCollaborator);

    console.log(this.form.value);
    this.adsService.update(this.id, this.form.value).subscribe(res => {
      console.log('advertising updated successfully!');
      this.upload();
    // this.router.navigateByUrl(`/advertising/${this.idCollaborator}`);
    })
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.adsService.uploadIMG(this.idF,this.currentFile).subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
              }
            },
            (err: any) => {
              console.log(err);
              this.progress = 0;
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the image!';
              }
              this.currentFile = undefined;
            });
      }
      this.selectedFiles = undefined;
    }
  }

}

