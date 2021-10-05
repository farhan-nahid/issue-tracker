document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

// submit issue from

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  // if any input field is empty don't add the data in local storage

  if (!description || !assignedTo) {
    return;
  }

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();

  fetchIssues();
  totalIssue();
  openIssue();
  e.preventDefault();
}

// show how many issues are in local storage

const totalIssue = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  document.getElementById("total__issue").innerText = `${issues.length}`;
};

// show how many issues are open

const openIssue = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const item = issues.filter((issue) => issue.status !== "Closed");
  document.getElementById("open__issue").innerText = `${item.length}`;
};

totalIssue();
openIssue();

// close the status of issues

const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => Number(issue.id) === id);
  currentIssue.status = "Closed";
  currentIssue.description = currentIssue.description.strike();
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
  openIssue();
};

// delete issues from local storage

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => Number(issue.id) !== id);
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
  totalIssue();
  totalIssue();
  openIssue();
};

// fetch issues from local storage

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";
  if (issues === null) {
    return;
  }

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `
          <div class="well">
              <h6>Issue ID: ${id} </h6>
              <p><span class="label label-info"> ${status} </span></p>
              <h3 id="description"> ${description} </h3>
              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
          </div>
    `;
  }
};
