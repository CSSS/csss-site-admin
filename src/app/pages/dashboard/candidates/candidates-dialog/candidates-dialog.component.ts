import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Candidate, CandidateCreate, OfficerPositionEnum } from '@api/backend-api/model/models';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { InputComponent } from '@pages/dashboard/crud-components/crud-dialog/input/input.component';
import { SelectComponent } from '@pages/dashboard/crud-components/crud-dialog/select/select.component';
import { TextareaComponent } from '@pages/dashboard/crud-components/crud-dialog/textarea/textarea.component';
import { ElectionsSourceService } from '@pages/dashboard/crud-sources/elections/elections.source.service';
import { officerLabels } from '@pages/dashboard/officers';
import { SelectOptions } from '@utils/type-utils';
import { distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import {
  CandidatesSourceEntry,
  CandidatesSourceService
} from '../candidates-sources/candidates.source.service';

@Component({
  selector: 'cs-candidates-dialog',
  imports: [ReactiveFormsModule, InputComponent, SelectComponent, TextareaComponent],
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

  private electionSourceService = inject(ElectionsSourceService);

  protected form = this.fb.group({
    computing_id: this.fb.control<string>('', Validators.required),
    nominee_election: this.fb.control<string>('', Validators.required),
    position: this.fb.control<OfficerPositionEnum | null>(null, Validators.required),
    speech: this.fb.control<string | null>(null)
  });

  /**
   * The options in the Election dropdown.
   *
   * Label: name of election
   * Value: slug of election
   */
  electionOptions = signal<Array<{ label: string; value: string }>>([]);

  /**
   * The options in the Officer position dropdown.
   */
  positionOptions = toSignal(
    this.form.get('nominee_election')?.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap(electionSlug => {
        const result = electionSlug
          ? this.electionSourceService.getElectionBySlug$(electionSlug).pipe(
              map(res => {
                const options: SelectOptions[] = [];
                if (res) {
                  for (const p of res.data.available_positions) {
                    options.push({
                      label: officerLabels[p],
                      value: p
                    });
                  }
                }
                return options;
              })
            )
          : of([]);
        return result;
      }),
      map(options => options),
      takeUntilDestroyed(this.destroyRef)
    ) ?? of([]),
    { initialValue: [] }
  );

  override setup(): void {
    if (this.isEditing()) {
      this.form.get('computing_id')?.disable();
      this.form.get('nominee_election')?.disable();
      this.electionSourceService
        .getElectionBySlug$(this.entry.data.nominee_election)
        .pipe(
          filter(entry => !!entry),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(entry => {
          this.electionOptions.set([{ label: entry.data.name, value: entry.data.slug }]);
        });

      return;
    }

    // Retrieves the election options for the election dropdown.
    this.electionSourceService
      .getEntries()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(entries => {
        this.electionOptions.set(
          entries.map(entry => ({
            label: entry.data.name,
            value: entry.data.slug
          }))
        );
      });
  }
}
