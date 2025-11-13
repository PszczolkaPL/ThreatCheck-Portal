from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from pydantic import BaseModel
from typing import List
import ipaddress
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CheckRequest(BaseModel):
    data: List[str]
    data_type: str  # e.g., "ip"

ABUSEIPDB_URL = "https://api.abuseipdb.com/api/v2/check"
ABUSEIPDB_KEY = os.getenv("ABUSEIPDB_KEY")
VT_API_KEY = os.getenv("VT_API_KEY")
VT_URL = "https://www.virustotal.com/api/v3/domains"
VT_URL_SUBMIT = "https://www.virustotal.com/api/v3/urls"
VT_ANALYSES_URL = "https://www.virustotal.com/api/v3/analyses"

@app.post("/check")
async def check_data(request: CheckRequest):


    results = []
    for item in request.data:
        if request.data_type == "ip":
            params = {"ipAddress": item, "maxAgeInDays": 90}
            headers = {"Key": ABUSEIPDB_KEY, "Accept": "application/json"}
            response = requests.get(ABUSEIPDB_URL, headers=headers, params=params)
            if response.status_code == 200:
                results.append(response.json())
            else:
                results.append({"error": f"Failed for {item}: {response.text}"})
        elif request.data_type == "domain":
            url = f"{VT_URL}/{item}"
            headers = {"x-apikey": VT_API_KEY, "Accept": "application/json"}
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                results.append(response.json())
            else:
                results.append({"error": f"Failed for {item}: {response.text}"})
        elif request.data_type == "url":
            # Submit URL for analysis
            headers = {"x-apikey": VT_API_KEY, "Accept": "application/json"}
            data = {"url": item}
            submit_response = requests.post(VT_URL_SUBMIT, headers=headers, data=data)
            if submit_response.status_code == 200:
                submit_data = submit_response.json()
                analysis_id = submit_data["data"]["id"]
                # Get analysis report
                analysis_url = f"{VT_ANALYSES_URL}/{analysis_id}"
                analysis_response = requests.get(analysis_url, headers=headers)
                if analysis_response.status_code == 200:
                    analysis_data = analysis_response.json()
                    stats = analysis_data["data"]["attributes"]["stats"]
                    malicious = stats.get("malicious", 0)
                    suspicious = stats.get("suspicious", 0)
                    if malicious > 0:
                        status = "malicious"
                    elif suspicious > 0:
                        status = "suspicious"
                    else:
                        status = "clean"
                    results.append({"url": item, "status": status, "stats": stats})
                else:
                    results.append({"error": f"Failed to get analysis for {item}: {analysis_response.text}"})
            else:
                results.append({"error": f"Failed to submit {item}: {submit_response.text}"})
        elif request.data_type == "autodetect":
            try:
                ipaddress.ip_address(item)
                # IP, use AbuseIPDB
                params = {"ipAddress": item, "maxAgeInDays": 90}
                headers = {"Key": ABUSEIPDB_KEY, "Accept": "application/json"}
                response = requests.get(ABUSEIPDB_URL, headers=headers, params=params)
                if response.status_code == 200:
                    results.append(response.json())
                else:
                    results.append({"error": f"Failed for {item}: {response.text}"})
            except ValueError:
                # Treat as domain or URL, use VirusTotal
                # For simplicity, assume domain; if URL, user should select url type
                url = f"{VT_URL}/{item}"
                headers = {"x-apikey": VT_API_KEY, "Accept": "application/json"}
                response = requests.get(url, headers=headers)
                if response.status_code == 200:
                    results.append(response.json())
                else:
                    results.append({"error": f"Failed for {item}: {response.text}"})
        else:
            results.append({"error": f"Unsupported data type: {request.data_type} for {item}"})

    return {"results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
