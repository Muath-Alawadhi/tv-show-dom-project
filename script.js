function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  const allShows = getAllShows();
  makePageForShow(allShows);
}
window.onload = setup;

function makePageForEpisodes(allEpisodes) {
  /* ___________Print All Episodes function___________  */
  printAllEpisodes(allEpisodes);
  /* ___________search User Input's function__________  */
  SearchBar(allEpisodes);
  /* ________Select Episodes User's function_______  */
  uerSelect(allEpisodes);
}

/* __________________________(1)printing the elements_____________________________  */

const rootElem = document.getElementById("root");
const container = document.createElement("div");
container.className = "container";

const search = document.createElement("div");
search.className = "search";

const searchTools = document.createElement("div");
searchTools.className = "searchTools";

rootElem.append(search, container);
search.appendChild(searchTools);

/* ______________________________________________________________________________  */
/* _______________________(2)Print All Episodes function_____________________  */
let users;
function printAllEpisodes(allEpisodes) {
  container.innerHTML = "";
  allEpisodes.sort((a, b) => a.name.localeCompare(b.name));
  //////loop through the Episodes////////
  users = allEpisodes.map((eachEpisode) => {
    const details = document.createElement("div");
    details.className = "details";

    const content = document.createElement("div");
    content.className = "content";

    const titles = document.createElement("h1");
    titles.className = "titles";
    titles.innerHTML = `${eachEpisode.name}- S${eachEpisode.season
      .toString()
      .padStart(2, "0")}E${eachEpisode.number.toString().padStart(2, "0")}`;
    // titles.innerHTML = `${eachEpisode.name}- S0${eachEpisode.season}E0${eachEpisode.number}`;

    const images = document.createElement("img");
    images.className = "images";
    images.src = eachEpisode.image.medium;
    images.alt = "Game of Thrones";

    const summary = document.createElement("p");
    summary.className = "paragraph";
    summary.innerHTML = `${eachEpisode.summary}`;

    container.appendChild(details);
    details.appendChild(content);
    content.append(titles, images, summary);
    return {
      name: eachEpisode.name,
      summary: eachEpisode.summary,
      element: details,
    };
  });
}
/* _____________________________________________________________________________  */
/* ______________________(3)search User Input's function______________________  */
let searchInput;
let iconElement;
let searchDetails;
function SearchBar(allEpisodes) {
  if (searchInput && iconElement && searchDetails) {
    searchTools.removeChild(searchInput);
    searchTools.removeChild(iconElement);
    search.removeChild(searchDetails);
  }
  searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = `Search for an episode.......`;
  searchInput.className = "searchInput";

  iconElement = document.createElement("i");
  iconElement.className = "fa-solid fa-magnifying-glass";
  iconElement.id = "iconElement";

  searchDetails = document.createElement("span");
  searchDetails.className = "searchDetails";
  searchDetails.innerHTML = `Displaying ${allEpisodes.length}/${allEpisodes.length}`;

  searchTools.prepend(iconElement, searchInput);
  search.appendChild(searchDetails);

  ///////////addEventListener////////////
  searchInput.addEventListener("input", searchAll);
  function searchAll(event) {
    let value = event.target.value.toLowerCase().trim();
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
}

/* ______________________________________________________________________________  */
/* _____________________(4)Select Episodes User's function____________________  */
let select;
function uerSelect(allEpisodes) {
  if (select) {
    search.removeChild(select);
  }
  select = document.createElement("select");
  select.className = "select";
  search.appendChild(select);

  const defaultOption = document.createElement("option");
  defaultOption.text = "Select an episode...!";
  defaultOption.className = "defaultOption";
  select.appendChild(defaultOption);

  allEpisodes.forEach((user) => {
    defaultOption.disabled = true;

    const option = document.createElement("option");
    option.className = "option";
    option.value = user.name;
    option.innerHTML = ` S0${user.season}E0${user.number}- ${user.name}`;
    select.appendChild(option);
  });

  //////////addEventListener/////////////
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
}

/* ______________________________________________________________________________  */
/* _____________________(6)Select allShows User's function____________________  */

function makePageForShow(allShows) {
  allShows.sort((a, b) => a.name.localeCompare(b.name));
  const search = document.querySelector(".search");
  const selectForShow = document.createElement("select");
  selectForShow.className = "selectForShow";

  const defaultOption = document.createElement("option");
  defaultOption.innerHTML = "select your show....!";
  defaultOption.selected = true;
  defaultOption.disabled = true;

  search.appendChild(selectForShow);
  selectForShow.appendChild(defaultOption);

  allShows.forEach((element) => {
    const optionForShow = document.createElement("option");
    optionForShow.value = element.id;
    optionForShow.className = "optionForShow";
    optionForShow.innerHTML = element.name;
    selectForShow.appendChild(optionForShow);
  });

  selectForShow.addEventListener("change", getThid);
  function getThid(event) {
    const showId = event.target.value;

    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then((response) => response.json())
      .then((data) => {
        makePageForEpisodes(data);
      });
  }
}
