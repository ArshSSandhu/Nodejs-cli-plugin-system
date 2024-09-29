import { TextPlugin } from '../types'; // Adjust the path according to your project structure

class ReverseTextPlugin implements TextPlugin {
  options: any;

  // Method to reverse the given text
  transformText(text: string): string {
    return text.split('').reverse().join('');
  }
}

export default ReverseTextPlugin;