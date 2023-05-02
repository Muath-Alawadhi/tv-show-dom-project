//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let container = document.createElement("div");
  container.className = "container";

  //////////////////////User search //////////////////

  let search = document.createElement("div");
  search.className = "search";

  let searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "Search for an episode...";
  searchInput.className = "searchInput";

  let searchDetails = document.createElement("span");
  searchDetails.className = "searchDetails";
  searchDetails.innerHTML = `Displaying ${episodeList.length}/${episodeList.length}`;

  rootElem.appendChild(search);
  search.appendChild(searchInput);
  search.appendChild(searchDetails);

  //////////////////////calling the data /////////////////

  let users = episodeList.map((a) => {
    let details = document.createElement("div");
    details.className = "details";

    let content = document.createElement("div");
    content.className = "content";

    let titles = document.createElement("h1");
    titles.className = "titles";
    titles.innerHTML = `${a.name}- S${a.season
      .toString()
      .padStart(2, "0")}E${a.number.toString().padStart(2, "0")}`;

    let images = document.createElement("img");
    images.className = "images";
    images.src = a.image.medium;
    images.alt = "Game of Thrones";

    let summary = document.createElement("p");
    summary.className = "paragraph";
    summary.innerHTML = `${a.summary}`;

    //////////////////////printing the data /////////////////

    rootElem.appendChild(container);
    container.appendChild(details);
    details.appendChild(content);
    content.appendChild(titles);
    content.appendChild(images);
    content.appendChild(summary);
  });

  //////////////////////User search //////////////////


}

window.onload = setup;
