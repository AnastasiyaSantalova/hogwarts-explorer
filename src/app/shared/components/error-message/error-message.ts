import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-message',
  imports: [MatButtonModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss'
})
export class ErrorMessage {
  @Input() retryCallback!: () => void;

  constructor() {}

  retryLoad(): void {
    this.retryCallback?.();
  }
}
