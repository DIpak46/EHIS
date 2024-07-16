import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import domtoimage from 'dom-to-image';
//import * as jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import { HttpService } from './http.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataState } from './reducers/user.reducers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  //listing the data
  testForm!: FormGroup;
  @ViewChild('report') report: ElementRef | undefined;
  isLinear = true;
  isSmallScreen = false;

  personalDetails!: FormGroup;
  addressDetails!: FormGroup;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLoading: boolean | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private https: HttpService,
    private toastr: ToastrService,
    private store: Store<{ data: DataState }>
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
    this.createForm();
    debugger

  }

  createForm() {
    this.personalDetails = this.fb.group({
      fullName: new FormControl(),
      dob: new FormControl(),
      age: new FormControl(),
      gender: new FormControl(),
      contactNumber: new FormControl(),
      emergencyContactNumber: new FormControl(),
      email: new FormControl(),
    });
    this.addressDetails = this.fb.group({
      streetAddress: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      stateId: new FormControl(),
      country: new FormControl(),
      countryId: new FormControl(),
      pincode: new FormControl(),
      status: new FormControl(),
    });
  }
  personalDataSubmit() {
    debugger;
    const data: any = this.personalDetails.getRawValue();
    if (this.personalDetails.valid) {
      this.https.save('/personalDetails', data).subscribe((res) => {
        if (res) {
          this.toastr.success(
            'Success',
            'Personal Details Saved successfully..',
            {
              timeOut: 3000,
            }
          );
        } else {
          this.toastr.error('Error', 'Error in Saving Data..', {
            timeOut: 3000,
          });
        }
      });
    } else {
      //form validation scroll up
    }
  }
  AddressDetails() {
    const data: any = this.addressDetails.getRawValue();
    if (this.addressDetails.valid) {
      this.https.save('/AddressDetails', data).subscribe((res) => {
        if (res) {
          this.toastr.success(
            'Success',
            'Address Details Saved successfully..',
            {
              timeOut: 3000,
            }
          );
        } else {
          this.toastr.error('Error', 'Error in Saving Data..', {
            timeOut: 3000,
          });
        }
      });
    } else {
    }
  }

  exportPDF() {
    this.isLoading = true;
    const node: any = document.getElementById('report');
    const node2: any = document.getElementById('header');
    //const node  = document.getElementById('report')
    let img: HTMLImageElement;
    let filename;
    let newImage: string;
    domtoimage
      .toPng(node, { bgcolor: '#fff' })
      .then((dataUrl) => {
        img = new Image();
        img.src = dataUrl;
        newImage = img.src;
        img.onload = () => {
          const pdfWidth = img.width;
          const pdfHeight = img.height;
          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image
          let doc;
          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
          } else {
            doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
          }
          const width = doc.internal.pageSize.getWidth();
          const height = doc.internal.pageSize.getHeight();
          doc.addImage(newImage, 'PNG', 10, 10, width, height);
          filename = 'report' + '.pdf';
          this.isLoading = false;
          doc.save(filename);
        };
      })
      .catch((error) => {
        // Error Handling
      });
  }
  
  submit() {
    this.exportPDF();
  }
  ngOnInit(): void {
   } //ngOnInit()

  
}
