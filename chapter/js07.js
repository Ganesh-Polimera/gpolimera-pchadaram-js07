document.getElementById("getFile").onchange = function() {
  // Retrieve information about the selected file
  let userFile = this.files[0];
  try {
    let isText = userFile.type.startsWith("text");
    if (!isText) {
      throw userFile.name + " is not a text file";
    }

    // Read the contents of the selected file
    let fr = new FileReader();
    fr.readAsText(userFile);

    // Once the file has finished loading, display it on the page
    let sourceDoc = document.getElementById("wc_document");
    fr.onload = function() {
      sourceDoc.innerHTML = fr.result;

      // Store the text of the document, removing HTML tags
      let sourceText = sourceDoc.textContent;

      // Verify that a text file is selected

      // Convert the source text to lowercase and remove leading and trailing whitespace
      sourceText = sourceText.toLowerCase().trim();

      // Leave only alphabet characters and whitespace in the text
      let alphaRegx = /[^a-zA-Z\s]/g;
      sourceText = sourceText.replace(alphaRegx, "");

      // Remove stop words from the text
      for (let i = 0; i < stopWords.length; i++) {
        let stopRegx = new RegExp("\\b" + stopWords[i] + "\\b", "g");
        sourceText = sourceText.replace(stopRegx, "");
      }

      // Place the remaining words in an array
      let words = sourceText.split(/\s+/g);

      // Sort the words in alphabetical order
      words.sort();

      // Create a 2D array where each item is an array containing a word and its duplicate count
      let unique = [[words[0], 1]];

      // Keep an index of the unique words
      let uniqueIndex = 0;

      for (let i = 1; i < words.length; i++) {
        if (words[i] === words[i - 1]) {
          // Increase the duplicate count by 1
          unique[uniqueIndex][1]++;
        } else {
          // Add a new word to the unique array
          uniqueIndex++;
          unique[uniqueIndex] = [words[i], 1];
        }
      }

      // Sort by descending order of duplicate count
      unique.sort(byDuplicate);

      function byDuplicate(a, b) {
        return b[1] - a[1];
      }

      // Keep the Top 100 words
      unique = unique.slice(0, 100);

      // Find the duplicates of the most-repeated word
      let maxCount = unique[0][1];

      // Sort the word list in alphabetic order
      unique.sort();

      // Reference the word cloud box
      let cloudBox = document.getElementById("wc_cloud");
      cloudBox.innerHTML = "";

      // Size each word based on its usage
      for (let i = 0; i < unique.length; i++) {
        let word = document.createElement("span");
        word.textContent = unique[i][0];
        word.style.fontSize = (unique[i][1] / maxCount) + "em";
        cloudBox.appendChild(word);
      }
    }
  } catch (err) {
    window.alert(err);
  }
};

// Define the stopWords array
let stopWords = ["the", "and", "is", "in", "it", "to", "a", "of", "for", "on"];
