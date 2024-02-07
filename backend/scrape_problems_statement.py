import requests
from bs4 import BeautifulSoup
from fastapi import HTTPException

test_url = "https://codeforces.com/contest/1363/problem/C"


# Function to scrape the problem statement from the problem url
def scrape_problem_statement(problem_url):
    try:
        response = requests.get(problem_url)
        soup = BeautifulSoup(response.text, "html.parser")
        # scraped_data = [
        #     {"id": idx, "text": item.text}
        #     for idx, item in enumerate(soup.find_all("div", class_="problem-statement"))
        # ]
        scraped_data = soup.find_all("div", class_="problem-statement")
        return scraped_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error scraping content: {str(e)}")


print(scrape_problem_statement(test_url))
