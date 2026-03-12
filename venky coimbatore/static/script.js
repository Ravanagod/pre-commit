async function scanCode() {

    let code = document.getElementById("code").value;

    if(code.trim() === ""){
        alert("Please paste some code to analyze.");
        return;
    }

    let formData = new FormData();
    formData.append("code", code);

    let response = await fetch("/scan",{
        method:"POST",
        body:formData
    });

    let data = await response.json();

    let riskLevel = "";
    let riskColor = "";

    if(data.risk_score <= 2){
        riskLevel = "SAFE";
        riskColor = "#10b981";
    }
    else if(data.risk_score <= 5){
        riskLevel = "WARNING";
        riskColor = "#f59e0b";
    }
    else{
        riskLevel = "HIGH RISK";
        riskColor = "#ef4444";
    }

    let html = `
    <div style="font-size:32px;font-weight:bold;margin:20px;">
        Risk Score: ${data.risk_score}
    </div>

    <div style="font-size:22px;color:${riskColor};margin-bottom:20px;">
        ${riskLevel}
    </div>

    <h2>Issues Found</h2>
    `;

    if(data.issues.length === 0){
        html += `
        <div style="color:#10b981;font-size:18px;margin-top:20px;">
        ✅ No issues detected. Your code looks safe!
        </div>
        `;
    }

    data.issues.forEach(issue => {

        let severityClass = "";
        let borderColor = "";

        if(issue.severity === "HIGH"){
            severityClass = "severity-high";
            borderColor = "#ef4444";
        }
        else if(issue.severity === "MEDIUM"){
            severityClass = "severity-medium";
            borderColor = "#f59e0b";
        }
        else{
            severityClass = "severity-low";
            borderColor = "#10b981";
        }

        html += `
        <div style="
            background:#1e293b;
            border-left:6px solid ${borderColor};
            padding:20px;
            margin:15px auto;
            width:60%;
            border-radius:8px;
            text-align:left;
        ">
            <div style="font-size:18px;font-weight:bold;">
                Issue: ${issue.issue}
            </div>

            <div style="margin-top:8px;" class="${severityClass}">
                Severity: ${issue.severity}
            </div>

            <div style="margin-top:10px;color:#cbd5f5;">
                Fix: ${issue.fix}
            </div>
        </div>
        `;
    });

    document.getElementById("results").innerHTML = html;
}