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
  @Input() propBelongsToSubject;
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
          console.log(control);
          if (error === 'pattern') {
            if (control.errors[error].requiredPattern === Constants.VALIDATION_MESSAGES.NAME.REGEX) {
              this.errorList.push(Constants.VALIDATION_MESSAGES.NAME.ERROR_MESSAGE);
            }
            if (control.errors[error].requiredPattern === Constants.VALIDATION_MESSAGES.PHONE_NUMBER.REGEX) {
              this.errorList.push(Constants.VALIDATION_MESSAGES.PHONE_NUMBER.ERROR_MESSAGE);
            }
          }
          if (error === 'required') {
            if (this.propBelongsToSubject) {
              this.errorList.push(Constants.VALIDATION_MESSAGES.REQUIRED_SUBJECT.replace('${fieldname}', this.displayNameOfControl));
            } else {
              this.errorList.push(Constants.VALIDATION_MESSAGES.REQUIRED_OBJECT.replace('${fieldname}', this.displayNameOfControl));
            }
          }
          if (error === 'email') {
            this.errorList.push(Constants.VALIDATION_MESSAGES.EMAIL.ERROR_MESSAGE);
          }
          if (error === 'minlength') {
            this.errorList.push(Constants.VALIDATION_MESSAGES.MIN_LENGTH.replace('${fieldName}', this.displayNameOfControl).replace('${length}',
              control.errors[error].requiredLength));
          }
          if (error === 'maxlength') {
            this.errorList.push(Constants.VALIDATION_MESSAGES.MAX_LENGTH.replace('${fieldName}', this.displayNameOfControl).replace('${length}',
              control.errors[error].requiredLength));
          }
          if (error === 'ERROR_MESSAGE') {
            this.errorList.push(control.errors[error]);
          }
        });
      }
    }
  }

}
