import aiohttp
from fastapi import FastAPI
from fastapi.exceptions import HTTPException, RequestValidationError
from fastapi.middleware import cors

app = FastAPI()
app.add_middleware(cors.CORSMiddleware, allow_origins=["*"])


@app.get("/")
def home():
    return {"Hello": "World"}


@app.get("/ladder")
async def ladder(lowerlimit: str, upperlimit: str):
    if int(lowerlimit) >= int(upperlimit):
        raise RequestValidationError(
            [
                {
                    "loc": ("lowerlimit", "upperlimit"),
                    "msg": "lowerlimit should be less than upperlimit",
                }
            ]
        )
    async with aiohttp.ClientSession() as session:
        async with session.get(
            "https://acodedaily.com/api/v2/ladder?startRating="
            + lowerlimit
            + "&endRating="
            + upperlimit
        ) as response:
            if response.status != 200:
                return HTTPException(
                    status_code=response.status, detail="ACD API is down"
                )
            data = await response.json()
            return list(item["name"] for item in data["data"])


@app.get("/submissions/{handle}")
async def submissions(handle: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(
            "https://codeforces.com/api/user.status?handle=" + handle
        ) as response:
            data = await response.json()
            return list(
                set(
                    item["problem"]["name"]
                    for item in data["result"]
                    if item["verdict"] == "OK"
                )
            )


@app.get("/get_unsolved_questions/{handle}/{lowerlimit}/{upperlimit}")
async def get_unsolved_questions(handle: str, lowerlimit: str, upperlimit: str):
    if int(lowerlimit) >= int(upperlimit):
        raise RequestValidationError(
            [
                {
                    "Error": ("lowerlimit", "upperlimit"),
                    "msg": "lowerlimit should be less than upperlimit",
                }
            ]
        )
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(
                "https://acodedaily.com/api/v2/ladder?startRating="
                + lowerlimit
                + "&endRating="
                + upperlimit
            ) as response:
                if response.status != 200:
                    return HTTPException(
                        status_code=response.status, detail="ACD API is down"
                    )
                questions_list = await response.json()
                async with session.get(
                    "https://codeforces.com/api/user.status?handle=" + handle
                    # + "&from=1&count=10000"
                ) as response:
                    if response.status != 200:
                        return HTTPException(
                            status_code=response.status, detail="CF API is down"
                        )
                    data = await response.json()
                    solved_questions = list(
                        set(
                            item["problem"]["name"]
                            for item in data["result"]
                            if item["verdict"] == "OK"
                        )
                    )
                    unsolved_questions = []
                    for question in questions_list["data"]:
                        if question["name"] not in solved_questions:
                            unsolved_questions.append(question["name"])
                    return unsolved_questions
        except Exception as e:
            return {"Error": "Please try again later" + str(e)}
