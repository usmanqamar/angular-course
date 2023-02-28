import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[myHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input('myHighlight') bgColor = 'blue';
  @Input() defaultBGColor = 'transparent';
  @HostBinding('style.backgroundColor') background: string = '';
  @HostBinding('style.color') color = 'black';

  constructor(private elem: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.background = this.defaultBGColor;
  }
  @HostListener('mouseenter') mouseEnter() {
    this.background = this.bgColor;
    this.color = 'white';
  }
  @HostListener('mouseleave') mouseLeave() {
    this.background = this.defaultBGColor;
    this.color = 'black';
  }
}
