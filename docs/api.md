# REST API (draft)

Base path: `/api`. JSON everywhere. Authentication: `Authorization: Bearer <JWT>`. Errors use the format `{ "status": 400, "error": "Bad Request", "message": "..." }`.

## Catalogue

| Method | Path | Description | Role |
|---|---|---|---|
| GET | `/titles?q=&genre=&tag=&format=&status=&year=&sort=&page=` | Search and filter | — |
| GET | `/titles/{id}` | Title with seasons and episodes | — |
| GET | `/titles/compare?ids=1,2,3` | Side-by-side comparison | — |
| GET | `/genres`, `/tags` | Reference data | — |
| POST/PUT/DELETE | `/titles/{id}`, `/genres/{id}`, `/tags/{id}` | Manage catalogue | MODERATOR |

## Aggregation

| Method | Path | Description | Role |
|---|---|---|---|
| POST | `/submissions` | Submit a YouTube playlist URL | AUTHOR |
| GET | `/submissions?status=PENDING` | Moderation queue | MODERATOR |
| POST | `/submissions/{id}/approve`, `/reject` | Decide on a submission | MODERATOR |

## Users

| Method | Path | Description | Role |
|---|---|---|---|
| POST | `/auth/register` | Sign up with ≥ 3 favourite genres | — |
| POST | `/auth/login` | Returns a JWT | — |
| PUT | `/titles/{id}/rating` | Rate 1–10 | USER |
| POST | `/titles/{id}/reviews` | Write a review | USER |
| GET | `/me/lists` | Personal lists | USER |
| PUT | `/me/lists/{titleId}` | Add a title or move it to another list | USER |
| GET | `/me/recommendations?limit=20` | Recommendations with explanations | USER |

## Status codes

| Code | When |
|---|---|
| 200 OK | Successful read or update |
| 201 Created | Registration, new review, new submission |
| 400 Bad Request | Validation error, invalid or private playlist URL |
| 401 Unauthorized | Missing, invalid or expired JWT |
| 403 Forbidden | The user's role does not allow the action (e.g. USER calls a MODERATOR endpoint) |
| 404 Not Found | Title, submission or episode does not exist |
| 409 Conflict | Email already registered; playlist already submitted |
| 503 Service Unavailable | YouTube quota exhausted; the submission is queued and processed the next day |

## Examples

```http
GET /api/titles?genre=horror&format=SERIES&sort=rating&page=0
```
```json
{
  "content": [
    { "id": 12, "name": "Example Series", "format": "SERIES", "status": "ONGOING",
      "genres": ["horror", "comedy"], "avgRating": 8.4, "episodeCount": 6,
      "posterUrl": "https://i.ytimg.com/vi/<videoId>/hqdefault.jpg" }
  ],
  "page": 0, "totalPages": 5, "totalElements": 93
}
```

```http
GET /api/me/recommendations?limit=2
```
```json
[
  { "titleId": 31, "name": "Example Short", "score": 0.82, "because": ["horror", "dark comedy"] },
  { "titleId": 7,  "name": "Another Series", "score": 0.77, "because": ["sci-fi"] }
]
```
