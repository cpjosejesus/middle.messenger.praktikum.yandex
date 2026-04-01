import Handlebars from "handlebars";

export function registerHelpers(): void {
  Handlebars.registerHelper(
    "ifEquals",
    function (
      this: unknown,
      a: unknown,
      b: unknown,
      options: Handlebars.HelperOptions,
    ) {
      return a === b ? options.fn(this) : options.inverse(this);
    },
  );
}
