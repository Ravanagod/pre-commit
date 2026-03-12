async function scanCode(){

let code=document.getElementById("code").value;

let formData=new FormData();
formData.append("code",code);

let response=await fetch("/scan",{
method:"POST",
body:formData
});

let data=await response.json();

let score=data.risk_score;

/* create gauge */

let ctx=document.getElementById("scoreGauge").getContext("2d");

if(window.gaugeChart){
window.gaugeChart.destroy();
}

window.gaugeChart=new Chart(ctx,{

type:"doughnut",

data:{

datasets:[{

data:[score,10-score],

backgroundColor:[
"#ef4444",
"#1e293b"
],

borderWidth:0

}]

},

options:{

rotation:-90,
circumference:180,

plugins:{
legend:{display:false}
}

}

});

/* show issues */

let html="<h2>Issues Found</h2>";

data.issues.forEach(issue=>{

html+=`

<div class="issue-card">

<b>Issue:</b> ${issue.issue}<br>
<b>Severity:</b> ${issue.severity}

<div class="fix">
Fix: ${issue.fix}
</div>

<div class="ai">
AI Suggestion: ${issue.ai_fix}
</div>

</div>

`;

});

document.getElementById("results").innerHTML=html;

}
