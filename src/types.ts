export interface IPlugin {
  name: string;
  packageName: string;
  isRelative?: boolean;
  instance?: any;
  options?: any;
}

export abstract class TextPlugin {
  options: any;

  constructor(options?: any) {
    this.options = options;
  }

  abstract transformText(text: string): string;
}