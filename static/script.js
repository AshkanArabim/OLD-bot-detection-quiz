const getBtn = document.querySelector("#gettweets");
const tweetholder = document.querySelector("#tweets");
const fetchurl = "http://localhost:3000";

class utils {
  static cr(element) {
    return document.createElement(element);
  }
  static qs(query) {
    return document.querySelector(query);
  }
  static appChildren(parent) {
    for (let i = 1; i <= arguments.length - 1; i++) {
      parent.appendChild(arguments[i]);
    }
  }
  static etc(element, text) {
    const product = this.cr(element);
    product.textContent = text;
    if (arguments[2]) {
      for (let i = 2; i < arguments.length; i++) {
        product.classList.add(arguments[i]);
      }
    }
    return product;
  }
}

function resetTable() {
  tweetholder.textContent = "";
}

function renderTable(data) {
  // tweet satus modifier functions
  async function modStatus(updatedStatus) {} // TODO

  // reset table
  resetTable();

  //populate first row
  const indexRow = document.createElement("tr");
  tweetholder.appendChild(indexRow);

  for (key of Object.keys(data[0])) {
    const indexCell = document.createElement("td");
    indexCell.textContent = key;
  }

  //render data for each row
  for (row of data) {
    const tr = document.createElement("tr");

    let firstItr = true;
    let id;

    // loop for data fields
    // iterates over columns
    for (cellData of Object.values(row)) {
      if (firstItr) {
        id = cellData;
        firstItr = false;
      }

      const td = document.createElement("td");
      td.textContent = cellData;
      tr.appendChild(td);
    }

    // add buttons for scam classification
    const actions = utils.etc("td", "please choose your opinion:");
    const scamBtn = utils.etc("button", "This is a scam", "scamBtn");
    const notScamBtn = utils.etc("button", "NOT a scam", "notScamBtn");
    utils.appChildren(actions, scamBtn, notScamBtn);

    // assign functions to response buttons
    scamBtn.addEventListener("click", () => {
      setTweetStatus("yes", id);
    });
    notScamBtn.addEventListener("click", () => {
      setTweetStatus("no", id);
    });

    tr.appendChild(actions);

    tweetholder.appendChild(tr);
  }
}

async function getTweets() {
  const response = await fetch(fetchurl + "/tweets", {
    method: "GET",
  });
  return response.json();
}

async function setTweetStatus(word, id) {
  const data = {
    word: word,
    id: id,
  };

  // DEBUG
  console.log(data);
  console.log(JSON.stringify(data));

  // send string to the backend.
  const response = await fetch(`${fetchurl}/response`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

getBtn.addEventListener("click", async () => {
  tweets = await getTweets();
  console.log(tweets);  
  renderTable(tweets);
});
