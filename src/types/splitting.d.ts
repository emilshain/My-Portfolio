declare module "splitting" {
  interface SplittingOptions {
    target?: HTMLElement;
    by?: string;
    key?: string;
  }

  function Splitting(options?: SplittingOptions): HTMLElement[];

  export default Splitting;
}
