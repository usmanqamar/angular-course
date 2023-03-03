import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appUnless]',
})
export class UnlessDirective {
  @Input() appUnlessElse?: TemplateRef<unknown>;
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else if (this.appUnlessElse) {
      this.vcRef.createEmbeddedView(this.appUnlessElse);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
