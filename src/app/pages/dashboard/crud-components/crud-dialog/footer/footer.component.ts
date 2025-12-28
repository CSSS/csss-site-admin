import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'cs-footer',
  imports: [Divider, Button],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogFooterComponent {
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  submit(): void {
    this.config.data.submitHandler.next();
  }

  cancel(): void {
    this.ref.close();
  }
}
