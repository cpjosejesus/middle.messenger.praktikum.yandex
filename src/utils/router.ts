import { Block } from "./block";

type BlockConstructor = new (props?: Record<string, unknown>) => Block;

class Route {
  private _pathname: string;
  private _blockClass: BlockConstructor;
  private _block: Block | null = null;
  private _rootQuery: string;

  constructor(pathname: string, view: BlockConstructor, rootQuery: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._rootQuery = rootQuery;
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
      this._block.dispatchComponentDidMount();
    }
    const root = document.querySelector(this._rootQuery);
    if (root) {
      root.innerHTML = "";
      root.append(this._block.getContent());
    }
  }

  leave(): void {
    this._block = null;
  }
}

export class Router {
  private static _instance: Router;
  private routes: Route[] = [];
  private _currentRoute: Route | null = null;
  private history: History = window.history;
  private _rootQuery = "";

  private constructor(rootQuery: string) {
    this._rootQuery = rootQuery;
  }

  static getInstance(rootQuery = "#app"): Router {
    if (!Router._instance) {
      Router._instance = new Router(rootQuery);
    }
    return Router._instance;
  }

  use(pathname: string, block: BlockConstructor): Router {
    const route = new Route(pathname, block, this._rootQuery);
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      this._onRoute("/404");
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router.getInstance();
