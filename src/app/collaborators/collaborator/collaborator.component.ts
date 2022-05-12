import { Component, OnInit } from '@angular/core';
import {Collaborator} from "../../models/collaborator";
import {ActivatedRoute, Router} from "@angular/router";
import { Placement as PopperPlacement, Options } from "@popperjs/core";
//import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {CollaboratorsService} from "../serviceCollaborator/collaborators.service";
import {TokenStorageService} from "../../_services/token-storage.service";
import {UserService} from "../../_services/user.service";
import {AdsService} from "../../advertisings/serviceAds/ads.service";
import {Adver} from "../../models/adver";
import {OfferService} from "../../offer/serviceOffer/offer.service";
import {Offer} from "../../models/offer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {
  closeResult: string | undefined;
  collaboratorsList:Collaborator[] = [];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserCol = false;
  username?: string;
  show=false;
  currentUser: any;
  auxUser : any;
  collaboratorsAdsList: Adver[] = [];
  public id: any;
  OfferList: Offer[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue!: number;
  currentRate = 0;
  //form!: FormGroup;


  constructor(private router: Router,private collaboratorsService:CollaboratorsService,
              private adsService: AdsService,private tokenStorageService: TokenStorageService,
              private userService: UserService,private route: ActivatedRoute,  private offerService: OfferService,private fb: FormBuilder) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit(): void {

    // this.form = this.fb.group({
    //   rating: ['', Validators.required],
    // })

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.currentUser = this.tokenStorageService.getUser();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserCol = this.roles.includes('ROLE_USER');
      this.username = user.username;
      this.userService.getUserById(this.currentUser.id).subscribe(
          data=>{this.auxUser=data;
            console.log(data);
          },
          error => {
            console.log(error);
          }

      );

    }
   this.retrieveCollaborators();
    this.retrieveAllAds();
    this.retrieveAllOffer();

  }

  countStar(star: number) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }
  retrieveAllAds():void{
    this.adsService.findAll().subscribe(data => {
      this.collaboratorsAdsList = data;
      console.log(this.collaboratorsAdsList);

    });
  }

  retrieveAllOffer():void{
    this.offerService.findAll().subscribe(data => {
      this.OfferList = data;
      console.log(this.OfferList);

    });
  }

  retrieveCollaborators():void{
    this.collaboratorsService.findAll().subscribe(data => {
      this.collaboratorsList = data;
      console.log(this.collaboratorsList);

    });
  }

  // open(content: any, id: number) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //     if (result === 'yes') {
  //       this.deleteCollaborator(id);
  //     }
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }



  deleteCollaborator(id:number){
    this.collaboratorsService.delete(id).subscribe(res => {
      this.collaboratorsList = this.collaboratorsList.filter(item => item.idCollaborator !== id);
      // this.reloadPage();
      console.log('Post deleted successfully!');


    })
  }
  reloadPage(): void {
    window.location.reload();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveCollaborators();
  }

}
