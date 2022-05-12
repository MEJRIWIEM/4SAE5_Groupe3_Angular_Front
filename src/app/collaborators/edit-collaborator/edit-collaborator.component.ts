import { Component, OnInit } from '@angular/core';
import {Collaborator} from "../../models/collaborator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CollaboratorsService} from "../serviceCollaborator/collaborators.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.css']
})
export class EditCollaboratorComponent implements OnInit {
  id!: number;
  collaborator!: Collaborator;
  form!: FormGroup;


  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(
      public collaboratorsService: CollaboratorsService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idCollaborator'];
    this.collaboratorsService.find(this.id).subscribe((data: Collaborator)=>{
      this.collaborator = data;
      console.log(this.collaborator = data);
    });

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      typeCollaborator: new FormControl('', [Validators.required]),

    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    console.log(this.form.value);
    this.collaboratorsService.update(this.id, this.form.value).subscribe(res => {
      console.log('Post updated successfully!');
      this.upload();
      this.router.navigateByUrl('/collaborator');
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
        this.collaboratorsService.uploadIMG(this.id,this.currentFile).subscribe(
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

