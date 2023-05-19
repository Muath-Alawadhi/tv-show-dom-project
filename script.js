function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  const allShows = getAllShows();
  makePageForShow(allShows);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let container = document.createElement("div");
  container.className = "container";

  //////////////////////User search(1) /////////////////

  let search = document.createElement("div");
  search.className = "search";

  let searchTools = document.createElement("div");
  searchTools.className = "searchTools";

  let searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = `Search for an episode.......`;
  searchInput.className = "searchInput";

  let iconElement = document.createElement("i");
  iconElement.className = "fa-solid fa-magnifying-glass";
  iconElement.id = "iconElement";

  let searchDetails = document.createElement("span");
  searchDetails.className = "searchDetails";
  searchDetails.innerHTML = `Displaying ${episodeList.length}/${episodeList.length}`;

  rootElem.appendChild(search);
  search.appendChild(searchTools);
  searchTools.appendChild(iconElement);
  searchTools.appendChild(searchInput);
  search.appendChild(searchDetails);

  //////////////////////calling the element /////////////////

  let users = episodeList.map((eachEpisode) => {
    let details = document.createElement("div");
    details.className = "details";

    let content = document.createElement("div");
    content.className = "content";

    let titles = document.createElement("h1");
    titles.className = "titles";
    titles.innerHTML = `${eachEpisode.name}- S${eachEpisode.season
      .toString()
      .padStart(2, "0")}E${eachEpisode.number.toString().padStart(2, "0")}`;
    // titles.innerHTML = `${eachEpisode.name}- S0${eachEpisode.season}E0${eachEpisode.number}`;

    let images = document.createElement("img");
    images.className = "images";
    images.src = eachEpisode.image.medium;
    images.alt = "Game of Thrones";

    let summary = document.createElement("p");
    summary.className = "paragraph";
    summary.innerHTML = `${eachEpisode.summary}`;

    //////////////////////printing  /////////////////

    rootElem.appendChild(container);
    container.appendChild(details);
    details.appendChild(content);
    content.appendChild(titles);
    content.appendChild(images);
    content.appendChild(summary);
    return {
      name: eachEpisode.name,
      summary: eachEpisode.summary,
      element: details,
    };
  });

  //////////////////////User search (2)//////////////////
  searchInput.addEventListener("input", searchAll);

  function searchAll() {
    let value = searchInput.value.toLowerCase().trim();
    users.forEach((user) => {
      let names = user.name.toLowerCase();
      let summarys = user.summary.toLowerCase();
      if (names.includes(value) || summarys.includes(value)) {
        user.element.style.display = "block";
      } else {
        user.element.style.display = "none";
      }
    });
    searchDetails.innerHTML = `Displaying ${
      users.filter((user) => user.element.style.display !== "none").length
    }/${users.length}`;
  }

  /////////////Select/////////////////
  let select = document.createElement("select");
  select.className = "select";
  search.appendChild(select);

  let defaultOption = document.createElement("option");
  defaultOption.text = "Select an episode...";
  defaultOption.className = "defaultOption";
  select.appendChild(defaultOption);

  episodeList.forEach((user) => {
    defaultOption.disabled = true;

    let option = document.createElement("option");
    option.className = "option";
    option.value = user.name;
    option.innerHTML = ` S0${user.season}E0${user.number}- ${user.name}`;
    select.appendChild(option);
  });
  select.addEventListener("change", function () {
    const selectedOption = select.value;

    users.forEach((user) => {
      if (user.name === selectedOption) {
        user.element.style.display = "block";
      } else {
        user.element.style.display = "none";
      }
    });
  });

  ///filter button ////////
}

function makePageForShow(allShows) {
  let search = document.querySelector(".search");
  let selectForShow = document.createElement("select");
  selectForShow.className = "selectForShow";

  let defaultOption = document.createElement("option");
  defaultOption.innerHTML = "select your show....!";
  defaultOption.selected = true;
  defaultOption.disabled = true;

  search.appendChild(selectForShow);
  selectForShow.appendChild(defaultOption);

  allShows.forEach((element) => {
    let optionForShow = document.createElement("option");
    optionForShow.value = element.id;
    optionForShow.innerHTML = element.name;
    selectForShow.appendChild(optionForShow);
  });

  selectForShow.addEventListener("change", getThid);
  function getThid(event) {
    let number = event.target.value;
    let url = `http://api.tvmaze.com/shows/${number}/episodes`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        makePageForEpisodes(data);
      })
      .catch((error) => {
        console.error("Error fetching episodes:", error);
      });
  }
}

window.onload = setup;

