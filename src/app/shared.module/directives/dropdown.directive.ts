import {
  Directive,
  ElementRef,
  HostListener,
  HostBinding,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appDropdown]',
})
export class DropdownDirective {
  constructor(private elem: ElementRef, private renderer: Renderer2) {}
  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    this.renderer.addClass(this.elem.nativeElement, 'show');
    const menu = this.elem.nativeElement.querySelector('.dropdown-menu');
    const button = this.elem.nativeElement.querySelector('.dropdown-toggle');
    const classList = button.classList;

    if (classList.contains('show')) {
      this.renderer.removeClass(menu, 'show');
      this.renderer.removeClass(button, 'show');
    } else {
      if (this.elem.nativeElement.contains(event.target)) {
        this.renderer.addClass(menu, 'show');
        this.renderer.addClass(button, 'show');
      }
    }
  }
}
