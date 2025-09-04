import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { LoginService } from './cas/login.service';

@Component({
  selector: 'cs-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  private login = inject(LoginService);

  ngOnInit(): void {
    this.login.validate();
  }
}
