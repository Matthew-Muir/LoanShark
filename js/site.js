function GenerateTableTemplate(loanLength) {
    const rowTemplate = "<tr><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>"
    let tableTemplate = "";

    for (let index = 0; index < loanLength; index++) {
        tableTemplate += rowTemplate;
    }
    return tableTemplate;
}

function InputDataIntoTableTemplate(loanLength ,loanObj) {
    let theLoan = loanObj;
    let tableTemplate = GenerateTableTemplate(loanLength);

    for (let index = 1; index <= theLoan.duration; index++) {

        let holder = theLoan.loanUpdate();
        tableTemplate = tableTemplate.replace("?", index.toString());
        tableTemplate = tableTemplate.replace("?", Number.parseFloat(theLoan.totalPayment).toFixed(2));
        tableTemplate = tableTemplate.replace("?", Number.parseFloat(holder[2]).toFixed(2));
        tableTemplate = tableTemplate.replace("?", Number.parseFloat(holder[3]).toFixed(2));
        tableTemplate = tableTemplate.replace("?", Number.parseFloat(holder[4]).toFixed(2));
        tableTemplate = tableTemplate.replace("?", Number.parseFloat(holder[5]).toFixed(2));
        
        if (index == theLoan.duration) {
            document.getElementById("monthlyPayment").innerHTML = "$" + Number.parseFloat(theLoan.totalPayment).toFixed(2);
            document.getElementById("totalPrincipal").innerHTML = "$" + Number.parseFloat(theLoan.amount).toFixed(2);
            document.getElementById("totalInterest").innerHTML = "$" + Number.parseFloat(holder[4]).toFixed(2);
            document.getElementById("totalCost").innerHTML = "$" + Number.parseFloat(theLoan.amount + holder[4]).toFixed(2);

        }
        
    }

    return tableTemplate;
}



function BtnClickEventFunction() {
    if (parseFloat(document.getElementById("loanAmount").value) && parseInt(document.getElementById("loanTerm").value) && parseFloat(document.getElementById("rate").value)) {
        const loanInfo = {
            amount: parseFloat(document.getElementById("loanAmount").value),
            balance: parseFloat(document.getElementById("loanAmount").value),
            paymentsLeft: parseInt(document.getElementById("loanTerm").value),
            interest: parseFloat(document.getElementById("rate").value),
            duration: parseInt(document.getElementById("loanTerm").value),
            get totalPayment(){
                return (this.amount) * (this.interest / 1200) / (1 - (1 + this.interest / 1200)**(0 - this.duration));
            },
            interestPaid: 0,
            interestPayment: 0,
            principalPayment: 0,
            loanUpdate: function(){
                if (this.amount == this.balance) {
                    this.interestPayment = this.amount * (this.interest / 1200);
                    this.interestPaid += this.interestPayment;
                    this.principalPayment = this.totalPayment - this.interestPayment;
                    this.balance = this.amount - this.principalPayment;
                    //this.paymentsLeft--;
                    
                }
                else
                {
                    this.interestPayment = this.balance * (this.interest / 1200);
                    this.interestPaid += this.interestPayment;
                    this.principalPayment = this.totalPayment - this.interestPayment;
                    this.balance = this.balance - this.principalPayment;
                    //this.paymentsLeft--;
                }
        
                return [this.paymentsLeft--, this.totalPayment, this.principalPayment, this.interestPayment, this.interestPaid, this.balance]
            }
        };
        
        document.getElementById("results").innerHTML = InputDataIntoTableTemplate(loanInfo.duration, loanInfo);
        
    }
    else {
        alert("All Fields Must Contain a Value Greater Than Zero.");
    }
    


}
