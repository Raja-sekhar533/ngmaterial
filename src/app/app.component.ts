import { Fruit } from './fruit';
import { Component , OnInit} from '@angular/core';
import { ENTER, COMMA} from '@angular/cdk/keycodes';
import {  MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import {map , startWith } from 'rxjs/operators';
import { Observable } from 'rxjs' ;
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent} from './dialog-example/dialog-example.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meterial';
  notifications = 0;
  showSpinner = false;
  myColor = 'blue';
  messages: string[] = [''];

// sidenav
  opened = false;
// select
selectedValue: string;
// auto complete
  options: string[] = ['raja sekhar' , 'naveen', 'jaswanth'  ];
objectOptions = [
  {name: 'raja sekhar'},
  {name: 'naveen kumar'},
  {name: 'jaswanth chowdary'},
  {name: 'prudhvi reddy battu'}
];
displayFn(subject) {
  return subject ? subject.name : undefined;
}

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

ngOnInit(){
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
}
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}


constructor(private snackbar: MatSnackBar, public dialog: MatDialog){}

  // chips
fruits: Fruit[] = [
    {name: 'apple'},
    {name: 'banana'},
    {name: 'orange'}
  ];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly seperatorKeyCodes: number[] = [ENTER, COMMA];


  // spinner
  loadData(){
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }

  // chips
 add(event: MatChipInputEvent){
   const input = event.input;
   const value = event.value;

   if ((value || '').trim()){
    this.fruits.push({name: value.trim()});
   }
   if (input){
    input.value = '' ;
  }
  }
  remove(fruit: Fruit){
    const index = this.fruits.indexOf(fruit);

    if (index >= 0){
      this.fruits.splice(index, 1);
    }
  }
  // sidenav
  log(state){
    console.log(state);
  }
  // slider
  formatLabel(value: number){
    if (value >= 1000){
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  OpenSnackBar(message, action){
  let snackBarRef = this.snackbar.open(message, action, {duration: 2000});
  snackBarRef.afterDismissed().subscribe(() => {
    console.log('this is dismissed!!!');
  });
  snackBarRef.onAction().subscribe(() => {
    console.log('this is clicked!!');
  });
  }
  openDialog(){
    let DialogRef = this.dialog.open(DialogExampleComponent);
    DialogRef.afterClosed().subscribe(result => {
    console.log(`the output is: ${result}`);
    });
  }
}
