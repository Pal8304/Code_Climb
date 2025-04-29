import aiohttp
import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.exceptions import HTTPException, RequestValidationError
from fastapi.middleware import cors

app = FastAPI()
app.add_middleware(cors.CORSMiddleware, allow_origins=["*"])


@app.get("/get_rating/{handle}")
async def get_rating(handle: str):
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(
                "https://codeforces.com/api/user.info?handles=" + handle
            ) as response:
                if response.status != 200:
                    return HTTPException(
                        status_code=response.status, detail="CF API is down"
                    )
                data = await response.json()
                return data["result"][0]["rating"]
        except Exception as e:
            return {"Error": "Please try again later" + str(e)}


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


@app.get("/get_questions/{handle}")
async def get_questions(handle: str):
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(
                "https://codeforces.com/api/user.info?handles=" + handle
            ) as response:
                if response.status != 200:
                    return HTTPException(
                        status_code=response.status, detail="CF API is down"
                    )
                data = await response.json()
                rating = data["result"][0]["rating"]
                lowerlimit = (rating // 100) * 100 - 200
                upperlimit = (rating // 100) * 100 + 200
                print(lowerlimit, upperlimit)
                async with session.get(
                    "https://acodedaily.com/api/v2/ladder?startRating="
                    + str(lowerlimit)
                    + "&endRating="
                    + str(upperlimit)
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
                            if (
                                question["name"] not in solved_questions
                                and question["rating"] == lowerlimit
                            ):
                                unsolved_questions.append(question)
                                lowerlimit += 100
                        return unsolved_questions
        except Exception as e:
            return {"Error": "Please try again later" + str(e)}


@app.get("/get_questions_by_tag/{handle}/{tag}")
async def get_questions_by_tag(handle: str, tag: str):
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(
                "https://codeforces.com/api/user.info?handles=" + handle
            ) as response:
                if response.status != 200:
                    return HTTPException(
                        status_code=response.status, detail="CF API is down"
                    )
                data = await response.json()
                rating = data["result"][0]["rating"]
                lowerlimit = (rating // 100) * 100 - 200
                upperlimit = (rating // 100) * 100 + 200
                async with session.get(
                    "https://codeforces.com/api/problemset.problems?tags=" + tag
                ) as response:
                    if response.status != 200:
                        return HTTPException(
                            status_code=response.status, detail="CF API is down"
                        )
                    data = await response.json()
                    questions_list = data["result"]["problems"]
                    # print(questions_list)
                    # return questions_list
                    async with session.get(
                        "https://codeforces.com/api/user.status?handle=" + handle
                    ) as response:
                        if response.status != 200:
                            return HTTPException(
                                status_code=response.status, detail="CF API is down"
                            )
                        data = await response.json()
                        # return data
                        data_with_verdict = []
                        solved_questions = list(
                            set(
                                item["problem"]["name"]
                                for item in data["result"]
                                if item["verdict"] == "OK"
                            )
                        )
                        for question in questions_list:
                            # if data_with_verdict.length > 5:
                            #     break
                            if (
                                "rating" in question
                                and question["rating"] >= lowerlimit
                                and question["rating"] <= upperlimit
                            ):
                                if question["name"] in solved_questions:
                                    data_with_verdict.append(
                                        {
                                            "name": question["name"],
                                            "rating": question["rating"],
                                            "solved": True,
                                            "contestId": question["contestId"],
                                            "index": question["index"],
                                        }
                                    )
                                else:
                                    data_with_verdict.append(
                                        {
                                            "name": question["name"],
                                            "rating": question["rating"],
                                            "solved": False,
                                            "contestId": question["contestId"],
                                            "index": question["index"],
                                        }
                                    )
                        return data_with_verdict
        except Exception as e:
            return {"Error": "Please try again later" + str(e)}


@app.get("/get_problem_statement/{contestId}/{index}")
async def get_problem_statement(contestId: str, index: str):
    try:
        url = "https://codeforces.com/contest/" + contestId + "/problem/" + index
        # print(url)
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")

        def find_and_prettify(class_name):
            element = soup.find("div", class_=class_name)
            return format(element.prettify()) if element else None

        # scraped_problem_statement_complete = find_and_prettify("problem-statement")
        scraped_problem_title = find_and_prettify("title")
        scraped_problem_time_limit = find_and_prettify("time-limit")
        scraped_problem_memory_limit = find_and_prettify("memory-limit")
        scraped_input_file = find_and_prettify("input-file")
        scraped_output_file = find_and_prettify("output-file")
        scraped_input_specification = find_and_prettify("input-specification")
        scraped_output_specification = find_and_prettify("output-specification")
        scraped_sample_tests = find_and_prettify("sample-tests")
        scraped_note = find_and_prettify("note")
        problem_statement_elements = soup.find("div", class_="problem-statement")
        scraped_problem_statement = problem_statement_elements.findChildren(
            "div", recursive=False
        )[1]
        print(scraped_problem_statement)
        problem_data = {
            "problem_statement": str(scraped_problem_statement),
            "problem_title": scraped_problem_title,
            "problem_time_limit": scraped_problem_time_limit,
            "problem_memory_limit": scraped_problem_memory_limit,
            "problem_input_file": scraped_input_file,
            "problem_output_file": scraped_output_file,
            "problem_input_specification": scraped_input_specification,
            "problem_output_specification": scraped_output_specification,
            "problem_sample_tests": scraped_sample_tests,
            "problem_note": scraped_note,
        }
        filtered_problem_data = {k: v for k, v in problem_data.items() if v}
        print(filtered_problem_data)
        return filtered_problem_data
    except Exception as e:
        print(e)
        return {"Error": "Please try again later" + str(e)}
