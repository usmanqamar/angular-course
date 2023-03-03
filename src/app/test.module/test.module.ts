import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildComponent } from './child.component';
// @NgModule({
//   //declarations: [TestComponent],
//   imports: [
//     ChildComponent,
//     RouterModule.forChild([
//       {
//         path: '',
//         component: TestComponent,
//       },
//       {
//         path: 'child',
//         component: ChildComponent,
//       },
//     ]),
//   ],
//   exports: [RouterModule],
// })
// export class TestModule {}
export const ROUTES = [
  {
    path: '',
    component: TestComponent,
  },
  {
    path: 'child',
    component: ChildComponent,
  },
];
