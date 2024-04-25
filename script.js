"use strict";

const quoteConatiner = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.querySelector(".loader");

let newQuote = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteConatiner.hidden = true;
}
function removeLoadingSpinner() {
  loader.hidden = true;
  quoteConatiner.hidden = false;
}

function randomQuote() {
  showLoadingSpinner();

  const quotes = newQuote[Math.floor(Math.random() * newQuote.length)];

  if (quotes.text.length > 10) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  if (!quotes.author) {
    authorText.textContent = "Unknwon";
  } else {
    authorText.textContent = quotes.author;
  }

  removeLoadingSpinner();

  quoteText.textContent = quotes.text;
}

async function getQuotes() {
  showLoadingSpinner();

  const apiURL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiURL);

    newQuote = await response.json();

    randomQuote();

    // throw new Error("⚡Your API not working");
  } catch (error) {
    console.error("error");
  }
}
getQuotes();

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterURL, "_blank");
}
newQuoteBtn.addEventListener("click", randomQuote);
twitterBtn.addEventListener("click", tweetQuote);
