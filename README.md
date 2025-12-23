# API Endpoints

The following endpoints are available for fetching and posting statistical data:

| Endpoint                  | Methods   | Description                            |
|---------------------------|----------|----------------------------------------|
| `/api/momentum_stats`     | GET/POST | Momentum / Trend Following stats       |
| `/api/factor_stats`       | GET/POST | Factor-Based stats                     |
| `/api/aiml_stats`         | GET/POST | AI/ML Research stats                   |
| `/api/equity_stats`       | GET/POST | Equity Long/Short stats                |
| `/api/event_stats`        | GET/POST | Event-Driven stats                     |
| `/api/option_stats`       | GET/POST | Options and Volatility stats           |
| `/api/sector_stats`       | GET/POST | Sector Rotation stats                  |

---

# Request Format

All POST requests should use JSON with the following structure:

```json
{
    "annual_return": 0.12,
    "performance": {
        "sharpe_ratio": 1.45,
        "max_drawdown": 0.08
    }
}
```
## Example Usage
```python
import requests

API_URL = "https://eagleeyeapi.deno.dev/api/stats"
TOKEN = "<auth_token>"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}

data = {
    "annual_return": 0.12,
    "performance": {
        "sharpe_ratio": 1.45,
        "max_drawdown": 0.08
    }
}

response = requests.post(API_URL, headers=headers, json=data)
print(response.status_code, response.text)
