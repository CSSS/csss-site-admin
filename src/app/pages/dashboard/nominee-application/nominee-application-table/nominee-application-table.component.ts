import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  Signal
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NomineeApplicationModel } from '@api/backend-api/model/models';
import { OfficerFormatPipe } from '@pages/dashboard/elections/elections-table/officer-format/officer-format.pipe';
import { filter, map, Subscription, tap } from 'rxjs';
import {
  CrudTableColumn,
  CrudTableComponent
} from '../../crud-components/crud-table/crud-table.component';
import { TableComponent } from '../../crud-components/crud-table/table-component';
import { NomineeApplicationDialogComponent } from '../nominee-application-dialog/nominee-application-dialog.component';
import {
  NomineeApplicationSourceEntry,
  NomineeApplicationSourceService
} from '../nominee-application-sources/nominee-application.source.service';

@Component({
  selector: 'cs-nominee-application',
  imports: [CrudTableComponent],
  templateUrl: './nominee-application-table.component.html',
  styleUrl: './nominee-application-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NomineeApplicationComponent
  extends TableComponent<
    NomineeApplicationModel,
    NomineeApplicationSourceEntry,
    NomineeApplicationDialogComponent
  >
  implements OnInit, OnDestroy
{
  electionName$?: Subscription;

  protected override dialogClass = NomineeApplicationDialogComponent;

  protected override dataSource = inject(NomineeApplicationSourceService);

  protected columns: Signal<CrudTableColumn<NomineeApplicationModel>[]> = computed(() => [
    {
      label: 'Computing ID',
      key: 'computing_id'
    },
    {
      label: 'Position',
      key: 'position',
      transform: (value: string) => this.officerPipe.transform(value)
    }
  ]);

  private officerPipe = inject(OfficerFormatPipe);

  private activatedRoute = inject(ActivatedRoute);

  override ngOnInit(): void {
    this.electionName$ = this.activatedRoute.params
      .pipe(
        filter(params => !!params['electionName']),
        map(params => params['electionName'] as string),
        tap(electionName => (this.dataSource.electionName = electionName))
      )
      .subscribe(() => {
        this.dataSource.fetch();
      });
  }

  override ngOnDestroy(): void {
    this.electionName$?.unsubscribe();
    super.ngOnDestroy();
  }
}
