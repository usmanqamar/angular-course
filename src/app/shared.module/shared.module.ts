import { NgModule } from '@angular/core';
import { DropdownDirective } from './directives/dropdown.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggingService } from '../logging.service';
@NgModule({
  declarations: [
    DropdownDirective,
    UnlessDirective,
    HighlightDirective,
    LoaderComponent,
  ],
  imports: [CommonModule],
  providers: [LoggingService],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DropdownDirective,
    HighlightDirective,
    UnlessDirective,
    LoaderComponent,
  ],
})
export class SharedModule {}
