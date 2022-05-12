import {Component, Input, OnInit, Output,EventEmitter, ViewEncapsulation} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";






@Component({
  selector: 'app-date-com',
  templateUrl: './date-com.component.html',
  styleUrls: ['./date-com.component.css']
})

export class DateComComponent implements OnInit {
// this helps TypeScript to understand jQuery best !!!  otherwise It will confused .
  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() public ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  public ratingArr:any = [];
  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:any) {
    console.log(rating)
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
