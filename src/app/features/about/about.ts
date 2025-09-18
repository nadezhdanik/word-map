import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TEAM } from './data/team.data';

@Component({
  selector: 'app-about',
  imports: [MatCardModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  public developers = TEAM;
  public flippedCard: number | null = null;

  public toggleFlip(index: number): void {
    this.flippedCard = this.flippedCard === index ? null : index;
  }
}
