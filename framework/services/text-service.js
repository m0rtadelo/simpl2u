export class TextService {

    /**
     * Removes diacritical marks (accents) from a string and converts it to lowercase.
     * 
     * @param {string} value - The input string to process.
     * @returns {string} The unaccented and lowercase version of the input string.
     */
    static unaccent(value) {
        return value
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
    }
    
    /**
     * Escapes HTML special characters in a string to prevent XSS attacks.
     * 
     * @param {string} value - The input string to sanitize.
     * @returns {string} The sanitized string with HTML special characters escaped.
     */
    static sanitize(value) {
        return (value || '').toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    
}