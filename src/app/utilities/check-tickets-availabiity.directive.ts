import {Directive} from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Constants} from '../constants/Constants';

@Directive({
  selector: '[appCheckTicketsAvailabiity]'
})
export class CheckTicketsAvailabiityDirective {

  constructor() {
  }

}

export function checkTicketsAvailabiityValidator(availableTicketCount: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const canBook = +availableTicketCount >= +control.value;
    return canBook ? null : {ERROR_MESSAGE: Constants.VALIDATION_MESSAGES.NUMBER_OF_SEATS.ERROR_MESSAGE};
  };
}
