import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-highlights-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlights-card.component.html'
})
export class HighlightsCardComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) number: string = '';
  @Input({ required: true }) unity: string = '';
  @Input() status: string = '';
}
