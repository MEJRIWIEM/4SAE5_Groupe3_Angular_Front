import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import { CollaboratorsService } from '../serviceCollaborator/collaborators.service';
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-collaborator-form',
  templateUrl: './collaborator-form.component.html',
  styleUrls: ['./collaborator-form.component.css']
})
export class CollaboratorFormComponent implements OnInit {



  // Build our form
  form!: FormGroup;
   id!:number;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';


  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private collaboratorService: CollaboratorsService) {}



  ngOnInit() :void{

    this.form = this.formBuilder.group({
      id: [],
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email,Validators.required]),
      typeCollaborator: [null, [Validators.required]],
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    //console.log(this.form.value);
    this.collaboratorService.create(this.form.value)
        .subscribe(data => {
              console.log('Collaborator created successfully!');
                this.upload();
              this.router.navigate(['/collaborator']);
            }, (error) => console.log(error)
        )
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
        this.collaboratorService.uploadIMG(this.id,this.currentFile).subscribe(
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
