import { ClassValue } from 'clsx';

import { Component, computed, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

import { mergeClasses, transform } from '@shared/utils/merge-classes';
import { ZardDropdownService } from './dropdown.service';
import { dropdownItemVariants, ZardDropdownItemVariants } from './dropdown.variants';

@Component({
  selector: 'z-dropdown-menu-item, [z-dropdown-menu-item]',
  exportAs: 'zDropdownMenuItem',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'classes()',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-variant]': 'variant()',
    '[attr.data-inset]': 'inset() || null',
    '[attr.aria-disabled]': 'disabled()',
    role: 'menuitem',
    tabindex: '-1',
  },
})
export class ZardDropdownMenuItemComponent {
  private dropdownService = inject(ZardDropdownService);

  readonly variant = input<ZardDropdownItemVariants['variant']>('default');
  readonly inset = input(false, { transform });
  readonly disabled = input(false, { transform });
  readonly class = input<ClassValue>('');

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Find the parent dropdown component and close it
    const dropdownElement = (event.target as HTMLElement).closest('z-dropdown-menu');
    if (dropdownElement) {
      // Trigger a custom event that the dropdown component can listen to
      dropdownElement.dispatchEvent(new CustomEvent('closeDropdown'));
    }

    // Close dropdown service as well (for compatibility)
    setTimeout(() => {
      this.dropdownService.close();
    }, 0);
  }

  protected readonly classes = computed(() =>
    mergeClasses(
      dropdownItemVariants({
        variant: this.variant(),
        inset: this.inset(),
      }),
      this.class(),
    ),
  );
}
