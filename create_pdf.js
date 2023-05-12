import { jsPDF } from "jspdf";


function generatepdf() {
  const surname = document.getElementById("surname").value
  const name = document.getElementById("name").value

  const doc = new jsPDF();

  doc.text('surname: ${surname}');
  doc.text('name: ${name}');

  doc.save("Quiz-Ergebniss.pdf");
}


