 function processFiles02() {
      const fileInput02 = document.getElementById('fileInput02');
      const combinedContent02 = document.getElementById('combinedContent02');
      const lineCountElement = document.getElementById('lineCount02');
      const downloadLink02 = document.getElementById('downloadLink02');
      
      combinedContent02.value = ''; // Clear previous content
      lineCountElement.textContent = '0'; // Reset line count
      downloadLink02.style.display = 'none'; // Hide download link

      const files = fileInput02.files;
      if (files.length === 0) {
        alert('Please select one or more files.');
        return;
      }

      let lineCount02 = 0;

      // Read and combine content of each file
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const content = e.target.result;
          combinedContent02.value += content + '\n'; // Add content with a newline separator
          lineCount02 += content.split('\n').length;
          lineCountElement.textContent = lineCount02.toString();
        };
        reader.readAsText(file);
      }

      // Display download link
      downloadLink02.style.display = 'block';
    }

    function downloadFile02() {
      const combinedContent02 = document.getElementById('combinedContent02').value;
      const blob = new Blob([combinedContent02], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const downloadLink02 = document.getElementById('downloadLink02');
      downloadLink02.href = url;
    }