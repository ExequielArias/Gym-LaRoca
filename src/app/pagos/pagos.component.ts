import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  activeTab = 'search'; // search, profile, history

  constructor() { }

  // Simulación de funciones
  selectClient(client: any) {
    this.activeTab = 'profile';
  }

  viewHistory() {
    this.activeTab = 'history';
  }
}