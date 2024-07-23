import { TextPlugin } from './types';

class UppercasePlugin implements TextPlugin {
  options: any;
  transformText(text: string): string {
    return text.toUpperCase();
  }
}

export default UppercasePlugin;