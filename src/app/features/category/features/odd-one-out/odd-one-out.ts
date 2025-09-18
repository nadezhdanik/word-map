import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-odd-one-out',
  imports: [],
  templateUrl: './odd-one-out.html',
  styleUrl: './odd-one-out.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OddOneOut {}
