from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from scanner import scan_code

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/scan")
async def scan(code: str = Form(...)):
    
    issues = scan_code(code)

    severity_weight = {
        "HIGH": 3,
        "MEDIUM": 2,
        "LOW": 1
    }

    risk_score = sum(severity_weight[i["severity"]] for i in issues)

    return JSONResponse({
        "risk_score": risk_score,
        "issues": issues
    })