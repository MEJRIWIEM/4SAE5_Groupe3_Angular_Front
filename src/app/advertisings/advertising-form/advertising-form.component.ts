import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdsService} from "../serviceAds/ads.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {FlashMessagesService} from "angular2-flash-messages";
import {DateRange, IgxDateRangePickerModule} from "igniteui-angular";


@Component({
  selector: 'app-advertising-form',
  templateUrl: './advertising-form.component.html',

styleUrls: ['./advertising-form.component.css']
})

export class AdvertisingFormComponent implements OnInit {
  form!: FormGroup;
  public id = this.route.snapshot.paramMap.get('idCollaborator');
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  idF!:number;





  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private flashMessage: FlashMessagesService,
      private adsService: AdsService) {}

  ngOnInit(): void {



    this.form = this.formBuilder.group({
      id: [],
      name: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required,Validators.min(10),Validators.max(90)]),
      typeAd: new FormControl('', [Validators.required]),
      targetNbrViews: [null, [Validators.required]],
      finalNbrViews: new FormControl('', [Validators.required]),
      //dateCreated:  new FormControl('', [Validators.required]),
     // dateEnd:  new FormControl('', [Validators.required]),
    });


  }
  public range: DateRange = { start: new Date(), end: new Date(new Date().setDate(new Date().getDate() + 5)) };


  get f(){
    return this.form.controls;
  }

  onSubmit(){

    // const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.adsService.create(this.id,this.form.value)
        .subscribe(data => {
              console.log('ads created successfully!');
this.upload();

              //  this.router.navigate(['/advertising']);
              // this.router.navigate(['/advertising', { idCollaborator: this.id }]);
             this.router.navigateByUrl(`/advertising/${this.id}`);
             // this.showFlash();



            }, (error) => console.log(error)
        )

  }
  showFlash() {
    // 1st parameter is a flash message text
    // 2nd parameter is optional. You can pass object with options.
    this.flashMessage.show('Advertising added ', { cssClass: 'custom-success', timeout: 5000 });
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
