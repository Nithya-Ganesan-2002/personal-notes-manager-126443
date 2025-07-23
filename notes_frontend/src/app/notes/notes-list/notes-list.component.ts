import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../note.model';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent {
  /** List of notes to show */
  @Input() notes: Note[] = [];
  @Input() selectedNoteId?: number;
  @Output() selectNote = new EventEmitter<number>();
  @Output() deleteNote = new EventEmitter<number>();

  onSelectNote(id: number) {
    this.selectNote.emit(id);
  }

  onDeleteNote(id: number, event: Event) {
    event.stopPropagation();
    this.deleteNote.emit(id);
  }
}
