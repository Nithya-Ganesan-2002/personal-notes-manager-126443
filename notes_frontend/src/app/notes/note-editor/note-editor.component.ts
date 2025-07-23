import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from '../note.model';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})
export class NoteEditorComponent {
  @Input() note: Note | null = null;
  @Output() save = new EventEmitter<{title: string, content: string}>();

  localTitle = '';
  localContent = '';

  ngOnChanges() {
    if (this.note) {
      this.localTitle = this.note.title;
      this.localContent = this.note.content;
    } else {
      this.localTitle = '';
      this.localContent = '';
    }
  }

  // PUBLIC_INTERFACE
  onSave() {
    this.save.emit({
      title: this.localTitle.trim() || 'Untitled note',
      content: this.localContent
    });
  }
}
