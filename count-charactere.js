  // Count Characters / Words
    const textarea = document.getElementById('inputTextareach47');
    const wordCount = document.getElementById('wordCountx47');
    const charCount = document.getElementById('charCount47');
    const charNoSpaceCount = document.getElementById('charNoSpaceCount47');

    textarea.addEventListener('input', function() {
      const text = this.value;

      // Character count (including spaces)
      charCount.textContent = text.length;

      // Character count (excluding spaces)
      const textNoSpaces = text.replace(/\s+/g, '');
      charNoSpaceCount.textContent = textNoSpaces.length;

      // Word count
      const words = text.trim().split(/\s+/);
      wordCount.textContent = text.trim() === '' ? 0 : words.length;
    });