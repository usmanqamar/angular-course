import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggingService } from '../logging.service';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoggingService],
  exports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class SharedModule {}
