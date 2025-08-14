import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

export function isTemplateRef<T>(value: TemplateRef<T> | unknown): value is TemplateRef<T> {
  return value instanceof TemplateRef;
}

@Directive({
  selector: '[zStringTemplateOutlet]',
  exportAs: 'zStringTemplateOutlet',
})
export class ZardStringTemplateOutletDirective<_T = unknown> implements OnChanges {
  private embeddedViewRef: EmbeddedViewRef<unknown> | null = null;
  private context = new ZardStringTemplateOutletContext();
  @Input() zStringTemplateOutletContext: any | null = null;
  @Input() zStringTemplateOutlet: unknown | TemplateRef<unknown> = null;

  static ngTemplateContextGuard<T>(_dir: ZardStringTemplateOutletDirective<T>, _ctx: unknown): _ctx is ZardStringTemplateOutletContext {
    return true;
  }

  private recreateView(): void {
    this.viewContainer.clear();
    if (isTemplateRef(this.zStringTemplateOutlet)) {
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.zStringTemplateOutlet, this.zStringTemplateOutletContext);
    } else {
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.context);
    }
  }

  private updateContext(): void {
    const newCtx = isTemplateRef(this.zStringTemplateOutlet) ? this.zStringTemplateOutletContext : this.context;
    const oldCtx = this.embeddedViewRef?.context as any;
    if (newCtx) {
      for (const propName of Object.keys(newCtx)) {
        oldCtx[propName] = newCtx[propName];
      }
    }
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { zStringTemplateOutletContext, zStringTemplateOutlet } = changes;
    const shouldRecreateView = (): boolean => {
      let shouldOutletRecreate = false;
      if (zStringTemplateOutlet) {
        shouldOutletRecreate = zStringTemplateOutlet.firstChange || isTemplateRef(zStringTemplateOutlet.previousValue) || isTemplateRef(zStringTemplateOutlet.currentValue);
      }
      const hasContextShapeChanged = (ctxChange: SimpleChange): boolean => {
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
          for (const propName of currCtxKeys) {
            if (prevCtxKeys.indexOf(propName) === -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      };
      const shouldContextRecreate = zStringTemplateOutletContext && hasContextShapeChanged(zStringTemplateOutletContext);
      return shouldContextRecreate || shouldOutletRecreate;
    };

    if (zStringTemplateOutlet) {
      this.context.$implicit = zStringTemplateOutlet.currentValue;
    }

    const recreateView = shouldRecreateView();
    if (recreateView) {
      this.recreateView();
    } else {
      this.updateContext();
    }
  }
}

export class ZardStringTemplateOutletContext {
  public $implicit: unknown;
}
