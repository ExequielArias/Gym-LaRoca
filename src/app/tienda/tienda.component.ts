import { CommonModule } from '@angular/common';
import { EliminarProductoDialogComponent } from './eliminar-producto-dialog.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductoDialogComponent } from './producto-dialog.component';
import { AgregarProductoDialogComponent } from './agregar-producto-dialog.component';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule, MatDialogModule, ProductoDialogComponent, AgregarProductoDialogComponent, EliminarProductoDialogComponent],
    selector: 'app-store',
    templateUrl: './tienda.component.html'
})
export class TiendaComponent {
    products = [
        { name: 'Proteína Whey Gold', price: '$45.000', description: 'Proteína de suero premium', badge: 'Más vendido' },
        { name: 'Creatina Monohidrato', price: '$25.000', description: 'Aumenta fuerza y resistencia', badge: 'Nuevo' },
        { name: 'Camiseta Gym LaRoca', price: '$18.000', description: 'Tela transpirable', badge: 'Exclusivo' },
        { name: 'BCAA Aminoácidos', price: '$35.000', description: 'Recuperación muscular', badge: 'Popular' },
        { name: 'Pre-entreno', price: '$30.000', description: 'Energía para entrenar', badge: 'Nuevo' },
        { name: 'Shaker Mixer', price: '$12.000', description: 'Para mezclar suplementos', badge: 'Accesorio' }
    ];

    constructor(private dialog: MatDialog) {}

    viewDetails(product: any) {
        this.dialog.open(ProductoDialogComponent, {
            width: '400px',
            data: product
        });
    }

    addProduct() {
        const dialogRef = this.dialog.open(AgregarProductoDialogComponent, {
            width: '400px'
        });
        dialogRef.afterClosed().subscribe((result: { name: string; description: string; price: string; badge: string } | undefined) => {
            if (result) {
                this.products.push({
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    badge: result.badge
                });
            }
        });
    }

    deleteProduct(index: number) {
        const dialogRef = this.dialog.open(EliminarProductoDialogComponent, {
            width: '350px'
        });
        dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
            if (result) {
            this.products.splice(index, 1);
            }
        });
    }
}
function Component(metadata: { standalone: boolean; imports: any[]; selector: string; templateUrl: string; }) {
    return function (target: any) {
        // Attach metadata to the component class for Angular's runtime
        Object.defineProperty(target, '__annotations__', {
            value: [metadata],
            configurable: true
        });
    };
}

