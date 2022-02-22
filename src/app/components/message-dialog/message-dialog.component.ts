import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent implements OnInit{
  type: string;
  error:boolean
  saved:boolean
  errorSave:boolean
  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.type = data.type;
  }
  ngOnInit(): void {
    switch(this.type){
      case 'error': {this.error = true; break;}
      case 'saved': {this.saved = true; break;}
      case 'errorSave': { this.errorSave = true; break;}
    } 
  }

  save() {
    this.dialogRef.close('yes');
  }

  close() {
    this.dialogRef.close();
  }
}
