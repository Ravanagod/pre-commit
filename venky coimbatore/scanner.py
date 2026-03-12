import re

rules = [
    {
        "pattern": r'password\s*=\s*["\'].*["\']',
        "message": "Hardcoded password detected",
        "severity": "HIGH",
        "fix": "Use environment variables instead of hardcoding credentials"
    },
    {
        "pattern": r'http://',
        "message": "Insecure HTTP request detected",
        "severity": "MEDIUM",
        "fix": "Use HTTPS for secure communication"
    },
    {
        "pattern": r'console\.log\(',
        "message": "Debug logging found",
        "severity": "LOW",
        "fix": "Remove debug logs before committing"
    },
    {
        "pattern": r'eval\(',
        "message": "Dangerous eval() usage",
        "severity": "HIGH",
        "fix": "Avoid eval() due to security risks"
    },
    {
        "pattern": r'SELECT .* \+',
        "message": "Possible SQL injection",
        "severity": "HIGH",
        "fix": "Use parameterized queries"
    }
]


def scan_code(code):

    issues = []

    for rule in rules:
        matches = re.findall(rule["pattern"], code)

        for m in matches:
            issues.append({
                "issue": rule["message"],
                "severity": rule["severity"],
                "fix": rule["fix"]
            })

    return issues