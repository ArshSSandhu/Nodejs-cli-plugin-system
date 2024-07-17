import { TextPlugin } from './types';

class PasswordifyPlugin extends TextPlugin {
    transformText(text: string): string {
        return text.replace(/./g, this.options.symbol);
    }
}

export default PasswordifyPlugin;
