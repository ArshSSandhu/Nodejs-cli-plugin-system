import { TextPlugin } from '../types';

class EchoPlugin extends TextPlugin {
  transformText(text: string): string {
    return text;
  }
}

export default EchoPlugin;
