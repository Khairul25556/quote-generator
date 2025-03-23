const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');


let apiQuotes = [];

//* show loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//* Hide loading

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//* Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
    const apiKey = 'P/jr77vQ4ACJlQNKX88QaA==fX3iVOxD0VwYY6Qx'; 
    try {
        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey  // Correct way to send the API key
            }
        });

        // If the response is successful (status 200-299), process the response
        if (res.ok) {
            const data = await res.json();  // Parse the JSON response
            
            // Assuming the response contains an array of quotes
            if (data && data.length > 0) { //So, the condition if (data && data.length > 0) means "If the data exists and the data array is not empty".
                const quoteTexts = data[0].quote;  // Extract the text of the first quote
                const authorTexts = data[0].author;
                console.log(quoteTexts);  // Display the quote text in the console
                if (quoteText && authorText) {
                    quoteText.innerText = quoteTexts;
                    authorText.innerText = authorTexts;
                } else {
                    console.log("Element(s) not found");
                }

                if(quoteTexts.length > 120){
                    quoteText.classList.add('long-quote');
                }
                else{
                    quoteText.classList.remove('long-quote');
                }
                complete();

            } else {
                console.log("No quotes found.");
            }
        } else {
            // If the response was not successful, log an error message
            console.log(`Error: ${res.status} - ${res.statusText}`);
            complete();
        }

    } catch (error) {
        console.log('Failed to fetch quotes:', error); // Catch any errors that occur during the fetch
        complete();
    }
}


//* Tweet Quote

function tweetQuote() {
    const tweetContent = `${quoteText.innerText} - ${authorText.innerText}`; // Get the actual text
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
    window.open(twitterUrl, '_blank'); // Open in a new tab
}


// Event listeners

newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

//* on load
getQuotes();

