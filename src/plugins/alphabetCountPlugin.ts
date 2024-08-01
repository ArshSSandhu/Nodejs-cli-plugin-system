import { TextPlugin } from '../types';

class AlphabetCountPlugin implements TextPlugin {
  options: any;

  transformText(text: string): string {
    const count = (text.match(/[a-zA-Z]/g) || []).length;
    return `Alphabet Count: ${count}`;
  }
}

export default AlphabetCountPlugin;