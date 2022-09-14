import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';

const routes: Routes = [{ path: "", redirectTo: "tableView", pathMatch: "full" },
{ path: "tableView", component: TableComponent },

// {path:"**",redirectTo:"Invoice",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
