import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Candidate, CandidateCreate, OfficerPositionEnum } from '@api/backend-api/model/models';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { InputComponent } from '@pages/dashboard/crud-components/crud-dialog/input/input.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import {
  CandidatesSourceEntry,
  CandidatesSourceService
} from '../candidates-sources/candidates.source.service';

@Component({
  selector: 'cs-candidates-dialog',
  imports: [ReactiveFormsModule, InputComponent, FloatLabelModule, InputTextModule],
  templateUrl: './candidates-dialog.component.html',
  styleUrl: './candidates-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidatesDialogComponent extends DialogComponent<
  Candidate,
  CandidatesSourceEntry,
  CandidateCreate
> {
  protected dataSource = inject(CandidatesSourceService);

  protected form = this.fb.group({
    position: this.fb.control<OfficerPositionEnum>(
      OfficerPositionEnum.President,
      Validators.required
    ),
    speech: this.fb.control<string | null>(null)
  });
}
