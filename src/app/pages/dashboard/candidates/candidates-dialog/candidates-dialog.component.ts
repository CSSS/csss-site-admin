import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ElectionService } from '@api/backend-api';
import { Candidate, CandidateCreate, OfficerPositionEnum } from '@api/backend-api/model/models';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { InputComponent } from '@pages/dashboard/crud-components/crud-dialog/input/input.component';
import { SelectComponent } from '@pages/dashboard/crud-components/crud-dialog/select/select.component';
import { ElectionsSourceService } from '@pages/dashboard/crud-sources/elections/elections.source.service';
import { officerLabels } from '@pages/dashboard/officers';
import {
  CandidatesSourceEntry,
  CandidatesSourceService
} from '../candidates-sources/candidates.source.service';

@Component({
  selector: 'cs-candidates-dialog',
  imports: [ReactiveFormsModule, InputComponent, SelectComponent],
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

  private electionApi = inject(ElectionService);
  private electionSourceService = inject(ElectionsSourceService);

  /**
   * The options in the Officer position dropdown.
   */
  positionOptions = signal<Array<{ label: string; value: OfficerPositionEnum }>>([]);

  protected form = this.fb.group({
    computing_id: this.fb.control<string>('', Validators.required),
    nominee_election: this.fb.control<string>('', Validators.required),
    position: this.fb.control<OfficerPositionEnum>(
      OfficerPositionEnum.President,
      Validators.required
    ),
    speech: this.fb.control<string | null>(null)
  });

  override ngOnInit(): void {
    super.ngOnInit();

    this.electionApi.getElectionByName(this.entry.data.nominee_election).subscribe(res => {
      this.positionOptions.set(
        res.available_positions.map(pos => ({
          label: officerLabels[pos],
          value: pos
        }))
      );
    });
  }
}
