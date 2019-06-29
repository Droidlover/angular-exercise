import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Constants} from '../../constants/Constants';

@Component({
  selector: 'app-add-error-view',
  templateUrl: './add-error-view.component.html',
  styleUrls: ['./add-error-view.component.css']
})
export class AddErrorViewComponent implements OnInit, OnChanges {

  @Input() controlAndVisibility;
  @Input() displayNameOfControl;
  errorList = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.setErrorList();
  }

  setErrorList() {
    this.errorList = [];
    if (this.controlAndVisibility.isVisible) {
      const control = this.controlAndVisibility.control;
      if (control.errors) {
        Object.keys(control.errors).forEach((error) => {
          console.log(error);
          if (error === 'pattern') {
            if (control.errors[error].requiredPattern === Constants.VALIDATION_MESSAGES.ALPHA_NUMERIC.REGEX) {
              this.errorList.push(Constants.VALIDATION_MESSAGES.ALPHA_NUMERIC.ERROR_MESSAGE);
            }
            if (control.errors[error].requiredPattern === Constants.VALIDATION_MESSAGES.PHONE_NUMBER.REGEX) {
              this.errorList.push(Constants.VALIDATION_MESSAGES.PHONE_NUMBER.ERROR_MESSAGE);
            }
          }
          if (error === 'required') {
            this.errorList.push(Constants.VALIDATION_MESSAGES.REQUIRED.replace('${fieldname}', this.displayNameOfControl));
          }
          if (error === 'email') {
            this.errorList.push(Constants.VALIDATION_MESSAGES.EMAIL.ERROR_MESSAGE);
          }
          if (error === 'ERROR_MESSAGE') {
            this.errorList.push(control.errors[error]);
          }
        });
      }
    }
  }

}
