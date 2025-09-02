import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface ElectionDatesFormErrors {
  nominationsTooLate?: boolean;
  startVotingWrong?: boolean;
  endVotingTooEarly?: boolean;
}

export function electionDatesValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const startNominations: Date = form.get('startNominations')?.value;
    const startVoting: Date = form.get('startVoting')?.value;
    const endVoting: Date = form.get('endVoting')?.value;

    if (!startNominations || !startVoting || !endVoting) {
      return null;
    }

    const errors: ElectionDatesFormErrors = {};
    if (startNominations > startVoting || startNominations > endVoting) {
      errors['nominationsTooLate'] = true;
    }
    if (startVoting > endVoting || startVoting < startNominations) {
      errors['startVotingWrong'] = true;
    }
    if (endVoting < startVoting || endVoting < startNominations) {
      errors['endVotingTooEarly'] = true;
    }

    return errors;
  };
}
