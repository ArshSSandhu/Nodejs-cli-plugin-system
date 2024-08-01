import { TextPlugin } from '../types';
import colors from 'colors';

class ColorsPlugin extends TextPlugin {
  transformText(text: string): string {
    return colors.rainbow(text);
  }
}

export default ColorsPlugin;
