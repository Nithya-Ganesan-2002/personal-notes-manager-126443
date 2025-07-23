import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from './note.model';

/**
 * NotesService manages CRUD operations for notes using an in-memory store (for now).
 * In the future, this service should be wired to HTTP backend APIs.
 */
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private notes: Note[] = [
    {
      id: 1,
      title: 'Sample Note',
      content: 'Welcome to your Notes app! Start by creating a new note.'
    }
  ];
  private nextId = 2;

  constructor() {
    this.notesSubject.next(this.notes);
  }

  // PUBLIC_INTERFACE
  getNotes(): Observable<Note[]> {
    /** Returns all notes as an Observable stream. */
    return this.notesSubject.asObservable();
  }

  // PUBLIC_INTERFACE
  getNoteById(id: number): Note | undefined {
    /** Finds and returns a note by its ID, or undefined if not found. */
    return this.notes.find(n => n.id === id);
  }

  // PUBLIC_INTERFACE
  createNote(note: Omit<Note, 'id'>): void {
    /** Adds a new note and notifies observers. */
    const newNote: Note = { ...note, id: this.nextId++ };
    this.notes = [newNote, ...this.notes];
    this.notesSubject.next(this.notes);
  }

  // PUBLIC_INTERFACE
  updateNote(updated: Note): void {
    /** Updates an existing note and notifies observers. */
    this.notes = this.notes.map(note => note.id === updated.id ? { ...updated } : note);
    this.notesSubject.next(this.notes);
  }

  // PUBLIC_INTERFACE
  deleteNote(id: number): void {
    /** Deletes a note by its ID and notifies observers. */
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
  }

  // PUBLIC_INTERFACE
  searchNotes(query: string): Note[] {
    /** Returns notes matching the search query. */
    const q = query.trim().toLowerCase();
    if (!q) {
      return this.notes;
    }
    return this.notes.filter(note =>
      note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q)
    );
  }
}
