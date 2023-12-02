console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const dogImage = document.getElementById('dog-image-container')
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => {
        if (data && data.message && Array.isArray(data.message)) {
            data.message.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl
                dogImage.appendChild(imgElement)
            })
        } else {
            console.error("Invalid response format")
        }
    })
    .catch(error => console.error("Error fetching images:"))

    fetch(breedUrl)
    .then(resp => resp.json())
    .then (data => {
        if (data && data.message) {
            const breeds = Object.keys(data.message)

            breeds.forEach(breed => {
                const breedItem = document.createElement('li')
                breedItem.innerText = breed
                breedList.appendChild(breedItem)

                breedItem.addEventListener("click", function() {
                    breedItem.style.color = 'blue'
                })
            })

            breedDropdown.addEventListener('change', function() {
                const selectedLetter = this.value.toLowerCase();
                filterBreedsByLetter(selectedLetter)
            })

        } else {
            console.error("Invalid response format for breeds")
        }
    })
    .catch(error => console.error("Error fetching breeds"))

    function filterBreedsByLetter(letter) {
        const breedItems = document.querySelectorAll('#dog-breeds li');
        breedItems.forEach(breedItem => {
          const breedName = breedItem.innerText.toLowerCase();
          if (breedName.startsWith(letter)) {
            breedItem.style.display = 'block';
          } else {
            breedItem.style.display = 'none';
          }
        });
      }
    });