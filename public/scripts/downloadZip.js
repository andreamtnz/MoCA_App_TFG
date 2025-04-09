// public/scripts/downloadZip.js
function downloadZip(testId) {
    fetch(`/getResultsFromDb/${testId}/download`)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `test-${testId}.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(err => {
        console.error("Error when downloading Zip file:", err);
        alert("Couldn' download file. Try again later.");
      });
  }
  