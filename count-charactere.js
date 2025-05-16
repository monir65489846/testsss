document.addEventListener('DOMContentLoaded', function() {
  const textarea = document.getElementById('inputTextareach47');
  const wordCount = document.getElementById('wordCountx47');
  const charCount = document.getElementById('charCount47');
  const charNoSpaceCount = document.getElementById('charNoSpaceCount47');

  textarea.addEventListener('input', function() {
    // Character count (including spaces)
    charCount.textContent = this.value.length;
    
    // Character count (excluding spaces)
    charNoSpaceCount.textContent = this.value.replace(/\s/g, '').length;
    
    // Word count
    wordCount.textContent = this.value.trim() === '' 
      ? 0 
      : this.value.trim().split(/\s+/).length;
  });
});
