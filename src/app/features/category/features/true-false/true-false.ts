import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-true-false',
  imports: [],
  templateUrl: './true-false.html',
  styleUrl: './true-false.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrueFalse {}
