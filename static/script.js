(() => {
  const tweetholder = document.querySelector("#tweets");
  const updateBtn = document.querySelector("#gettweets");
  const port = 3000;
  const fetchurl = `http://localhost:${port}`;

  updateBtn.addEventListener("click", update);

  function resetTable() {
    tweetholder.textContent = "";
  }

  function renderTable(data) {
    // TODO: render table header
    resetTable();

    //populate first row
    const indexRow = document.createElement("tr");
    tweetholder.appendChild(indexRow);

    for (key of Object.keys(data[0])) {
      appChildren(indexRow, etc("td", key));
    }
    //add another cell to describe the feeback functions
    appChildren(indexRow, etc("td", "Please provide your feedback:"));

    //render data for each row
    for (row of data) {
      const tr = document.createElement("tr");

      let firstItr = true;
      let id;

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

      const actions = etc("td", "");
      const scamBtn = etc("button", "This is a scam", "scamBtn");
      const notScamBtn = etc("button", "NOT a scam", "notScamBtn");

      scamBtn.addEventListener("click", () => {
        sendFeedback("yes", id);
        renderTable(data);
        update();
      });
      notScamBtn.addEventListener("click", () => {
        sendFeedback("no", id);
        renderTable(data);
        update();
      });

      appChildren(actions, scamBtn, notScamBtn);
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

  async function sendFeedback(word, id) {
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

  async function update() {
    tweets = await getTweets();
    console.log(tweets);
    renderTable(tweets);
  }

  //DOM utilities
  function cr(element) {
    return document.createElement(element);
  }
  function qs(query) {
    return document.querySelector(query);
  }
  function appChildren(parent) {
    for (let i = 1; i <= arguments.length - 1; i++) {
      parent.appendChild(arguments[i]);
    }
  }
  function etc(element, text) {
    const product = cr(element);
    product.textContent = text;
    if (arguments[2]) {
      for (let i = 2; i < arguments.length; i++) {
        product.classList.add(arguments[i]);
      }
    }
    return product;
  }
})();
