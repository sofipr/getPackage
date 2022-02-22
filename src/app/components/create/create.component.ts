import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/selectors/package.selector';
import * as Actions from '../../store/actions/package.action';
import { ApiService } from 'src/app/service/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { DateFilterFn } from '@angular/material/datepicker';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  loginError: String;
  visible = false;
  createForm: FormGroup;
  cities: any = null;
  times: any = null;
  minDate: Date;
  mobilephoneRegex = /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.createReactiveForm();
    this.store
      .select(Selectors.getCities)
      .subscribe((data) => (this.cities = Array.from(Object.values(data))));

    this.minDate = new Date();

    this.disableDays();
  }
  disableDays() {}
  createReactiveForm() {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern(this.mobilephoneRegex)],
      ],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      receiverName: ['', [Validators.required]],
      receiverPhone: [
        '',
        [Validators.required, Validators.pattern(this.mobilephoneRegex)],
      ],
      receiverAddress: ['', [Validators.required]],
      receiverCity: ['', [Validators.required]],
      dod: ['', [Validators.required]],
      receiverTime: ['', [Validators.required]],
      price: [''],
      priceWithVat: [''],
    });
    this.formValueChange();
  }
  formValueChange() {
    this.createForm.valueChanges.subscribe((value) => {
      this.visible = this.createForm.valid;
    });
  }

  errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  };
  date(e: any) {
    var d = new Date(e.target.value);

    this.store
      .select(Selectors.getTimesByDay(this.days[d.getDay()]))
      .subscribe((data) => (this.times = data));
  }
  cityChange() {
    let price = 0;
    let aprice = 0;
    if (
      this.createForm.get('city')?.value ===
      this.createForm.get('receiverCity')?.value
    ) {
      this.store
        .select(Selectors.getPriceByCuty(this.createForm.get('city')?.value))
        .subscribe((data) => (price = data));
    } else {
      this.store
        .select(Selectors.getPriceByCuty(this.createForm.get('city')?.value))
        .subscribe((data) => (price = data));

      this.store
        .select(
          Selectors.getPriceByCuty(this.createForm.get('receiverCity')?.value)
        )
        .subscribe((data) => (aprice = data));

      price = price + aprice + 10;
    }
    const priceVat = price * 1.17;
    this.createForm.get('price')?.setValue(price);
    this.createForm.get('priceWithVat')?.setValue(priceVat);
  }
  onSubmit() {
    if (this.createForm.valid) {
      let convertDate = new Date(this.createForm.get('dod')?.value)
        .toISOString()
        .substring(0, 10);

      let data = {
        name: this.createForm.get('name')?.value,
        phone: this.createForm.get('phone')?.value,
        address: this.createForm.get('address')?.value,
        city: this.createForm.get('city')?.value,
        receiverName: this.createForm.get('receiverName')?.value,
        receiverPhone: this.createForm.get('receiverPhone')?.value,
        receiverAddress: this.createForm.get('receiverAddress')?.value,
        receiverCity: this.createForm.get('receiverCity')?.value,
        dod: convertDate,
        receiverTime: this.createForm.get('receiverTime')?.value,
        price: this.createForm.get('price')?.value,
        priceWithVat: this.createForm.get('priceWithVat')?.value,
      };
      this.apiService.save(data).subscribe(
        (data: any) => {
          if (data.token) {
            this.openDialog('saved');
          } else {
            this.loginError = 'errrr';
            this.openDialog('errorSave');
          }
        },
        (error) => (this.loginError = error)
      );
    }
  }
  openDialog(type: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';
    dialogConfig.data = {
      type,
    };
    const dialogRef = this.dialog.open(MessageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {});
  }
}
