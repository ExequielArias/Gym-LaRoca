import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RutinaDialogComponent } from './rutina-dialog.component';

interface Exercise { id: string; name: string; sets: number; reps: string; weight?: string; rest: string; notes?: string; }
interface Routine { id: string; clientName: string; name: string; description: string; exercises: Exercise[]; createdDate: string; trainer: string; difficulty: string; duration: number; }

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatDialogModule, RutinaDialogComponent],
  selector: 'app-routines',
  templateUrl: './rutinas.component.html'
})
export class RutinasComponent {
  deleteRoutine(index: number) {
    if (confirm('¿Seguro que quieres eliminar esta rutina?')) {
      this.routines.splice(index, 1);
    }
  }

  editRoutine(index: number) {
    alert('Funcionalidad de modificar rutina próximamente');
    // Aquí podrías abrir un diálogo para editar la rutina seleccionada
  }
  routines: Routine[] = [
    { id: '1', clientName: 'Juan Pérez', name: 'Rutina de Fuerza - Principiante', description: 'Rutina enfocada en desarrollo de fuerza básica', exercises: [{ id: 'e1', name: 'Sentadillas', sets: 3, reps: '12-15', rest: '60s' }], createdDate: '2024-01-15', trainer: 'Carlos Mendoza', difficulty: 'beginner', duration: 60 },
    { id: '2', clientName: 'Ana García', name: 'Rutina Funcional', description: 'Entrenamiento funcional', exercises: [{ id: 'e2', name: 'Burpees', sets: 4, reps: '10', rest: '45s' }], createdDate: '2024-01-20', trainer: 'Ana García', difficulty: 'intermediate', duration: 45 }
  ];

  selectedRoutine: Routine | null = null;
  isAddOpen = false;

  constructor(private dialog: MatDialog) {}

  newRoutine: Partial<Routine> = { clientName: '', name: '', description: '', trainer: '', difficulty: 'beginner', duration: 60, exercises: [] };
  newExercise: Partial<Exercise> = { name: '', sets: 3, reps: '', rest: '60s', weight: '' };

  addExercise() {
    if (!this.newExercise.name || !this.newExercise.reps) return;
    const ex: Exercise = {
      id: Date.now().toString(),
      name: this.newExercise.name!,
      sets: this.newExercise.sets || 3,
      reps: this.newExercise.reps!,
      weight: this.newExercise.weight,
      rest: this.newExercise.rest || '60s'
    };
    this.newRoutine.exercises = [...(this.newRoutine.exercises || []), ex];
    this.newExercise = { name: '', sets: 3, reps: '', rest: '60s', weight: '' };
  }

  saveRoutine() {
    const dialogRef = this.dialog.open(RutinaDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Si result.ejercicios es un array, lo mapeo a Exercise[]
        const ejercicios: Exercise[] = Array.isArray(result.ejercicios)
          ? result.ejercicios.map((ej: any, idx: number) => ({
              id: Date.now().toString() + '-' + idx,
              name: ej.name || ej.nombre || '',
              sets: ej.sets || 1,
              reps: ej.reps || '1',
              rest: ej.rest || '60s',
              weight: ej.weight || '',
              notes: ej.notes || ''
            }))
          : result.ejercicios
            ? [{
                id: Date.now().toString() + '-0',
                name: result.ejercicios,
                sets: 1,
                reps: '1',
                rest: '60s'
              }]
            : [];
        this.routines = [
          ...this.routines,
          {
            id: Date.now().toString(),
            clientName: result.cliente,
            name: result.nombreRutina,
            description: result.descripcion,
            exercises: ejercicios,
            createdDate: new Date().toISOString().split('T')[0],
            trainer: result.entrenador,
            difficulty: 'beginner',
            duration: result.duracion || 60
          }
        ];
      }
    });
    this.isAddOpen = false;
  }
}
