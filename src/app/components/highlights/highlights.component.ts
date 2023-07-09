import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightsCardComponent } from '../highlights-card/highlights-card.component';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, HighlightsCardComponent],
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent {

}
