import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../notes.service';
import { Note } from '../note.model';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { NoteEditorComponent } from '../note-editor/note-editor.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NotesListComponent,
    NoteEditorComponent,
    SearchBarComponent
  ],
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  selectedNoteId?: number;
  isCreating: boolean = false;
  searchTerm: string = '';

  private notesService = new NotesService();

  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.applySearch();
      if (!this.selectedNoteId && notes.length) {
        this.selectedNoteId = notes[0].id;
      }
      if (this.selectedNoteId && !notes.some(n => n.id === this.selectedNoteId)) {
        this.selectedNoteId = notes.at(0)?.id;
      }
    });
  }

  onCreateNewNote() {
    this.isCreating = true;
    this.selectedNoteId = undefined;
  }

  onSaveNote(note: {title: string, content: string}) {
    if (this.isCreating) {
      this.notesService.createNote(note);
      this.isCreating = false;
    } else if (this.selectedNoteId) {
      this.notesService.updateNote({ ...note, id: this.selectedNoteId });
    }
    this.searchTerm && this.applySearch();
  }

  onSelectNote(id: number) {
    this.isCreating = false;
    this.selectedNoteId = id;
  }

  onDeleteNote(id: number) {
    this.notesService.deleteNote(id);
    if (this.selectedNoteId === id) {
      this.selectedNoteId = this.notes.at(0)?.id;
    }
    this.searchTerm && this.applySearch();
  }

  onSearch(query: string) {
    this.searchTerm = query;
    this.applySearch();
  }

  private applySearch() {
    this.filteredNotes = !this.searchTerm
      ? this.notes
      : this.notesService.searchNotes(this.searchTerm);
  }

  get selectedNote(): Note | null {
    if (this.isCreating) {
      return null;
    }
    return this.notes.find(n => n.id === this.selectedNoteId) ?? null;
  }
}
