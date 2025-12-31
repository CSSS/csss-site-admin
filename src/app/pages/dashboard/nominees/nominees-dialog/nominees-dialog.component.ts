import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Nominee, NomineeCreate } from '@api/backend-api/model/models';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { InputComponent } from '@pages/dashboard/crud-components/crud-dialog/input/input.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import {
  NomineesSourceEntry,
  NomineesSourceService
} from '../nominees-sources/nominees.source.service';

@Component({
  selector: 'cs-nominees-dialog',
  imports: [ReactiveFormsModule, InputComponent, FloatLabelModule, InputTextModule],
  templateUrl: './nominees-dialog.component.html',
  styleUrl: './nominees-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NomineesDialogComponent extends DialogComponent<
  Nominee,
  NomineesSourceEntry,
  NomineeCreate
> {
  protected dataSource = inject(NomineesSourceService);

  protected form = this.fb.group({
    full_name: this.fb.control('', Validators.required),
    linked_in: this.fb.control<string | null>(null),
    instagram: this.fb.control<string | null>(null),
    email: this.fb.control<string | null>(null),
    discord_username: this.fb.control<string | null>(null)
  });
}
