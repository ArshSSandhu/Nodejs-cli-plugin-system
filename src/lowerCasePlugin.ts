import { TextPlugin } from './types';


class LowercasePlugin implements TextPlugin {
  options: any;
  transformText(text: string): string {
    return text.toLowerCase();
  }
}


export default LowercasePlugin;