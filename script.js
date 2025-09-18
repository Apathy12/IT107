document.getElementById("bmiForm").addEventListener("submit", function(e){
    e.preventDefault();

    let height = parseFloat(document.getElementById("Height").value);
    let weight = parseFloat(document.getElementById("Weight").value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById("result").innerText = "Please enter valid values.";
        return;
    }

    let bmi = weight / ((height/100) ** 2);
    document.getElementById("result").innerText = `Your BMI is ${bmi.toFixed(2)}`;

    saveBMIResult(bmi);

    showHistory();
});

function saveBMIResult(bmi){
    let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    history.push({
        bmi: bmi,
        date: new Date().toLocaleString()
    });
    localStorage.setItem("bmiHistory", JSON.stringify(history));
}

function showHistory(){
    let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    let output = "<h2>Your BMI History</h2><ul>";
    history.forEach(item => {
        output += `<li>${item.date} → BMI: ${item.bmi.toFixed(2)}</li>`;
    });
    output += "</ul>";
    document.getElementById("history").innerHTML = output;
}

showHistory();
