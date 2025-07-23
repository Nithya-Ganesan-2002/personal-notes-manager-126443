import { Component, EventEmitter, Output } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() createNew = new EventEmitter<void>();

  onCreateNote() {
    this.createNew.emit();
  }
}
