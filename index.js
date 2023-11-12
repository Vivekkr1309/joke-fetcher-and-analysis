function fetchJokeAndAnalyze() {
    fetchJoke()
        .then(analyzeSentiment)
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchJoke() {
    var jokeApiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    return fetch(jokeApiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("joke-text").innerText = data.joke;
            return data.joke;
        });
}

function analyzeSentiment(joke) {
    var apiKey = 'JNtF8NdlHsIivwTD09ARluEOU4yXhuH5'; 
    var sentimentApiUrl = 'https://api.promptapi.com/sentiment/analysis';

    var myHeaders = new Headers();
    myHeaders.append('apikey', apiKey);
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ txt: joke, lang: 'en' })
    };

    fetch(sentimentApiUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
            updateSentimentResults(result);
        })
        .catch(error => {
            console.error('Error analyzing sentiment:', error);
        });
}

function updateSentimentResults(result) {
    document.getElementById("content-type").innerText = 'Content Type: ' + result.content_type;
    document.getElementById("language").innerText = 'Language: ' + result.language;
    document.getElementById("sentiment").innerText = 'Sentiment: ' + result.sentiment;
}
