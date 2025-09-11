**Security Data Portal** is a modern web application built with **React** (frontend) and **Python** (backend) that allows users to analyze potential threats associated with **IP addresses, domains, phone numbers, email addresses, and IoT devices**.

## Features

- **Data Input**: Manually enter data or upload files containing IPs, domains, phone numbers, or emails.
- **Validation & Parsing**: Backend validates and parses data to ensure correct format.
- **Threat Checking via Free APIs**:
  - **IP**: AbuseIPDB, APIVoid IP Reputation, Antideo IP Reputation
  - **Domains**: VirusTotal, APIVoid Domain Reputation, WhoisXML Domain Reputation
  - **Phone numbers**: NumVerify, IPQualityScore Phone Lookup, NumlookupAPI
  - **Emails**: Email verification and disposable address detection
  - **IoT devices**: Detection and vulnerability check
- **Results Display**: Interactive table or window with filtering, searching, and sorting.
- **Export Options**: Download results as JSON, TXT, or CSV.
- **Additional Features**: Copy to clipboard, save/restore sessions, configure parser settings.
- **UI**: Modern, responsive, and intuitive design with real-time visualizations.

## Architecture

- **Frontend**: React, handles user input, dynamic display, and interactions.
- **Backend**: Python, manages API requests, aggregates results, handles errors, and returns structured data to frontend.
