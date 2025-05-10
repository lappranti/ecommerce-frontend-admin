import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  private isOpen = false;
  @Input() appDropdown!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
      const dropdownElement = this.el.nativeElement.querySelector(
        `#${this.appDropdown}`
      );
      if (dropdownElement) {
        this.renderer.removeClass(dropdownElement, 'show');
      }
    }
  }

  @HostListener('click')
  toggleOpen() {
    this.isOpen = !this.isOpen;
    const dropdownElement = this.el.nativeElement.querySelector(
      `#${this.appDropdown}`
    );
    if (dropdownElement) {
      if (this.isOpen) {
        this.renderer.addClass(dropdownElement, 'show');
      } else {
        this.renderer.removeClass(dropdownElement, 'show');
      }
    }
  }
}
