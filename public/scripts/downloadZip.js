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

function openEvaluationForm(testId){
  const form = document.getElementById(`evaluate${testId}`);
  if (form) {
    form.style.display = form.style.display === "none" ? "block" : "none";
  }
}

function submitEvaluation(event, testId) {
  event.preventDefault(); // Evita que el formulario recargue la página

  const form = event.target;
  const textarea = form.querySelector('textarea');
  const evaluation = textarea.value;

  fetch(`/saveEvaluationToDb/${testId}/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ evaluation })
  })
  .then(res => res.json())
  .then(data => {
    alert("Evaluation was saved successfully");
    location.reload(); // Refresca para que desaparezca el botón
  })
  .catch(err => {
    console.error("Error when saving evaluation", err);
    alert("Fail to save evaluation");
  });
}

  