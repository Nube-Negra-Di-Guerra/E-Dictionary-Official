const input = document.getElementById("input");
const infoText = document.getElementById("info-text")
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audio = document.getElementById("audio");
const phonetics = document.getElementById("phonetics")

async function fetchAPI (word){
    try{
        infoText.style.display= "block";
        meaningContainer.style.display="none";
        infoText.innerText= `Searching for ${word}...`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}?locale=en_GB`;
        const result = await fetch(url).then((res) =>res.json());

        if (result.title){
            infoText.style.display="none"
            meaningContainer.style.display = "block"
            title.innerText = word;
            meaning.innerText = "Your word either doesn't exist or is too advanced for this dictionary.";

            phonetics.style.display="none";
            audio.style.display = "none";

        } else {
            console.log(result)
            infoText.style.display = "none";
            meaningContainer.style.display = "block";
            audio.style.display = "inline-flex"
            title.innerText = result[0].word.charAt(0).toUpperCase() + word.slice(1) + " means :";
            title.style.fontWeight = "bold"
            meaning.innerText= result[0].meanings[0].definitions[0].definition;
            meaning.style.color= "rgba(12, 21, 51, 0.932)"
            meaning.style.fontWeight= "bold"
            audio.src= result[0].phonetics[0].audio;

            phonetics.innerText = "Phonetic transcription : " + result[0].phonetics[0].text;
            phonetics.style.display = "block";
            phonetics.style.fontWeight = "bold"
        }
         
    } catch (error) {
        console.log(error);
        infoText.innerText= 'Looks like your internet connection took a vacation ;)'+ "tray again later.";
    }
}

input.addEventListener("keyup", (e) => {
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    }
});