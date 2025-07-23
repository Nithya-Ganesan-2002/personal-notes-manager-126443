import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm = '';
  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }
}
