import requests
from bs4 import BeautifulSoup

test_url = "https://codeforces.com/contest/1363/problem/C"


# Function to scrape the problem statement from the problem url
def scrape_problem_statement(problem_url):
    try:
        response = requests.get(problem_url)
        soup = BeautifulSoup(response.text, "html.parser")
        problem_statement = soup.find_all("div", class_="problem-statement")
        return problem_statement
    except Exception as e:
        return e


# print(scrape_problem_statement(test_url))
