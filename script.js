document.getElementById("bmiForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let height = parseFloat(document.getElementById("Height").value);
  let weight = parseFloat(document.getElementById("Weight").value);

  
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    document.getElementById("result").innerText =
      "⚠️ Please enter valid values.";
    return;
  }
  if (height < 50 || height > 250 || weight < 10 || weight > 300) {
    document.getElementById("result").innerText =
      "⚠️ Please enter realistic values.";
    return;
  }

  let bmi = weight / ((height / 100) ** 2);
  document.getElementById(
    "result"
  ).innerText = `✅ Your BMI is ${bmi.toFixed(2)}`;

  saveBMIResult(bmi);
  showHistory();
});

function saveBMIResult(bmi) {
  let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];

  history.push({
    bmi: btoa(bmi.toFixed(2)), 
    date: btoa(new Date().toLocaleString()), 
  });

  localStorage.setItem("bmiHistory", JSON.stringify(history));
}

function showHistory() {
  let historyData = localStorage.getItem("bmiHistory");
  let output = "<h2>Your BMI History</h2>";

  if (!historyData) {
    document.getElementById("history").innerHTML =
      output + "<p>No records yet.</p>";
    return;
  }

  try {
    let history = JSON.parse(historyData);
    output += "<ul>";
    history.forEach((item) => {
      output += `<li>${atob(item.date)} → BMI: ${atob(item.bmi)}</li>`;
    });
    output += "</ul>";
    document.getElementById("history").innerHTML = output;
  } catch (err) {
    console.error("Corrupted history data:", err);
    document.getElementById("history").innerHTML =
      output + "<p>⚠️ History data corrupted.</p>";
  }
}


function clearHistory() {
  localStorage.removeItem("bmiHistory");
  document.getElementById("history").innerHTML =
    "<h2>Your BMI History</h2><p>No records yet.</p>";
}

showHistory();
