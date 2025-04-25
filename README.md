# Code Climb

## A web application to improve your competitive programming skills and to help you prepare for interviews.
### The application is built using FastAPI and React and uses codeforces and acodedaily APIs to fetch problems.

### How to run the frontend

``` 
    cd frontend
    cd my-app
    yarn install
    yarn start
```

### How to run the backend

```
    cd backend
    python3 -m venv venv    
    source venv/bin/activate
    pip install -r requirements.txt
    uvicorn CF_ACD:app --reload
```

### To do :
- [] Handle Unrated and Above 3500 rated people 
