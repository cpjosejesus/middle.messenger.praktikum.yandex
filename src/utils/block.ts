import Handlebars from "handlebars";
import { EventBus } from "./event-bus";

type Props = Record<string, unknown>;

export abstract class Block<T extends Props = Props> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  private _element: HTMLElement | null = null;
  protected props: T;
  private eventBus: EventBus;

  constructor(props: T = {} as T) {
    this.eventBus = new EventBus();
    this.props = this._makePropsProxy(props);
    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(): void {
    this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this) as (...args: unknown[]) => void,
    );
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init(): void {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _createResources(): void {
    this._element = document.createElement("div");
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.props).forEach((child) => {
      if (child instanceof Block) {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: T, newProps: T): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(_oldProps: T, _newProps: T): boolean {
    return true;
  }

  setProps(nextProps: Partial<T>): void {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement {
    return this._element!;
  }

  private _render(): void {
    const block = this.render();
    const newElement = document.createElement("div");
    newElement.innerHTML = block;

    Object.entries(this.props).forEach(([key, child]) => {
      if (child instanceof Block) {
        const stub = newElement.querySelector(`[data-id="${key}"]`);
        if (stub) {
          stub.replaceWith(child.getContent());
        }
      }
    });

    this._removeEvents();
    const firstChild = newElement.firstElementChild as HTMLElement | null;
    if (firstChild) {
      this._element!.replaceWith(firstChild);
      this._element = firstChild;
    }

    this._addEvents();
  }

  protected render(): string {
    return "";
  }

  protected compile(template: string, context: object): string {
    const propsWithStubs = { ...context } as Record<string, unknown>;

    Object.entries(this.props).forEach(([key, child]) => {
      if (child instanceof Block) {
        propsWithStubs[key] = `<div data-id="${key}"></div>`;
      }
    });

    return Handlebars.compile(template)(propsWithStubs);
  }

  getContent(): HTMLElement {
    return this._element!;
  }

  private _makePropsProxy(props: T): T {
    return new Proxy(props, {
      get: (target: T, prop: string) => {
        const value = target[prop as keyof T];
        return typeof value === "function"
          ? (value as Function).bind(target)
          : value;
      },
      set: (target: T, prop: string, value: unknown) => {
        const oldTarget = { ...target };
        (target as Record<string, unknown>)[prop] = value;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("No access");
      },
    });
  }

  private _addEvents(): void {
    const events = this.props.events as
      | Record<string, EventListener>
      | undefined;
    if (!events) return;
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _removeEvents(): void {
    const events = this.props.events as
      | Record<string, EventListener>
      | undefined;
    if (!events) return;
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  show(): void {
    this.getContent().style.display = "block";
  }

  hide(): void {
    this.getContent().style.display = "none";
  }
}
