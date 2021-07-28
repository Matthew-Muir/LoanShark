function GetFormValues() {
    let principalAmount = document.getElementById("loanAmount").value;
    let interestRate = document.getElementById("rate").value;
    let loanLength = document.getElementById("loanTerm").value;
    let paymentAmount = Number.parseFloat((principalAmount) * (interestRate / 1200) / (1 - (1 + interestRate / 1200)**(0 - loanLength))).toFixed(2);
    return { principalAmount, interestRate, loanLength, paymentAmount};
}

function GenerateTableTemplate(loanLength) {
    const rowTemplate = "<tr><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>"
    let tableTemplate = "";

    for (let index = 0; index < loanLength; index++) {
        tableTemplate += rowTemplate;
    }
    return tableTemplate;
}



function InputDataIntoTableTemplate() {
    let formValues = GetFormValues();
    let tableTemplate = GenerateTableTemplate(formValues.loanLength);

    for (let index = 1; index <= formValues.loanLength; index++) {

        
        tableTemplate = tableTemplate.replace("?", index.toString());
        tableTemplate = tableTemplate.replace("?", formValues.paymentAmount.toString());
        tableTemplate = tableTemplate.replace("?", );
        tableTemplate = tableTemplate.replace("?", );
        tableTemplate = tableTemplate.replace("?", );
        tableTemplate = tableTemplate.replace("?", (formValues.principalAmount - (formValues.paymentAmount * index)).toString() );
        
    }

    return tableTemplate;
}



function BtnClickEventFunction() {
    document.getElementById("results").innerHTML = InputDataIntoTableTemplate();
}
