<script>
  // Variables to keep track of the current index and number of images to display
  let currentIndex = 0;
  const imagesPerPage = 30;

  // Function to display the images
  function displayImages(images) {
    const container = document.getElementById("photos");
    images.forEach(imageUrl => {
      const div = document.createElement('div');
      div.classList.add('col-md-2')
      const div2 = document.createElement('div');
      div2.classList.add('overflow-hidden')
      const img = document.createElement("img");
      img.setAttribute('data-enlargeable', '');
      img.setAttribute('width', '100%');
      img.setAttribute('style', 'cursor: zoom-in');
      img.setAttribute('onclick', 'manageClick("' + imageUrl + '")');
      img.src = imageUrl;
      div2.appendChild(img);
      div.appendChild(div2);
      container.appendChild(div);
    });
  }

  // Function to handle the "Load More" button click
  function handleLoadMore() {
    const nextIndex = currentIndex + imagesPerPage;

    // Replace the URL with the actual endpoint of your backend that returns image URLs
    const backendEndpoint = 'admin/photoslist';

    fetch(backendEndpoint)
        .then(response => response.json())
        .then(data => {
            const images = data.slice(currentIndex, nextIndex);
            displayImages(images);

            if (nextIndex >= data.length) {
                // Hide the "Load More" button if there are no more images
                document.getElementById("loadMoreButton").style.display = "none";
            }

            currentIndex = nextIndex;
        })
        .catch(error => console.error('Error fetching images:', error));
}

  // Initial display
  handleLoadMore();
</script>
